import { getAccessToken, getNowPlaying, getRecentlyPlayed } from '../../lib/spotify';

export const prerender = false;

let cachedResponse: { tracks: any[]; timestamp: number } | null = null;
const CACHE_TTL = 30_000;

export const GET = async () => {
  try {
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
      return new Response(JSON.stringify({ tracks: cachedResponse.tracks }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    const access_token = await getAccessToken();

    const [nowPlayingRes, recentlyPlayedRes] = await Promise.all([
      getNowPlaying(access_token).catch(() => null),
      getRecentlyPlayed(access_token).catch(() => null),
    ]);

    console.log(
      `[Spotify] nowPlaying status: ${nowPlayingRes?.status ?? 'null'}` +
      ` | recentlyPlayed status: ${recentlyPlayedRes?.status ?? 'null'}`
    );

    let rawTracks: any[] = [];

    if (nowPlayingRes && nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song.item && song.currently_playing_type === 'track') {
        rawTracks.push({
          title: song.item.name,
          artist: song.item.artists.map((_a: any) => _a.name).join(', '),
          url: song.item.external_urls.spotify,
          albumArt: song.item.album.images[song.item.album.images.length - 1]?.url,
          isPlaying: true,
        });
      }
    }

    let recentOk = false;
    if (recentlyPlayedRes && recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      const recentTracks = (recentData?.items ?? []).map((item: any) => ({
        title: item.track.name,
        artist: item.track.artists.map((_a: any) => _a.name).join(', '),
        url: item.track.external_urls.spotify,
        albumArt: item.track.album.images[item.track.album.images.length - 1]?.url,
        isPlaying: false,
      }));
      if (recentTracks.length > 0) recentOk = true;
      rawTracks = [...rawTracks, ...recentTracks];
    } else if (recentlyPlayedRes) {
      console.warn(
        `[Spotify] recentlyPlayed returned ${recentlyPlayedRes.status}` +
        ` — ${recentlyPlayedRes.statusText}`
      );
    }

    const seen = new Set();
    let uniqueTracks = rawTracks
      .filter((track) => {
        const key = `${track.title}-${track.artist}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 5);

    if (!recentOk && uniqueTracks.length < 5 && cachedResponse) {
      const currentKeys = new Set(uniqueTracks.map((t) => `${t.title}-${t.artist}`));
      const backfill = cachedResponse.tracks
        .filter((t) => !currentKeys.has(`${t.title}-${t.artist}`))
        .map((t) => ({ ...t, isPlaying: false }))
        .slice(0, 5 - uniqueTracks.length);
      uniqueTracks = [...uniqueTracks, ...backfill];
    }

    if (uniqueTracks.length > 0) {
      cachedResponse = {
        tracks: uniqueTracks.map((t) => ({ ...t, isPlaying: false })),
        timestamp: Date.now(),
      };
    }

    return new Response(JSON.stringify({ tracks: uniqueTracks }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[Spotify] Top-level error:', error);

    if (cachedResponse) {
      return new Response(JSON.stringify({ tracks: cachedResponse.tracks }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    return new Response(JSON.stringify({ tracks: [], error: 'API Error' }), {
      status: 500,
    });
  }
};