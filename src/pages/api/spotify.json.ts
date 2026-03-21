import { getNowPlaying, getRecentlyPlayed } from '../../lib/spotify';

export const prerender = false;

export const GET = async () => {
  try {
    const [nowPlayingRes, recentlyPlayedRes] = await Promise.all([
      getNowPlaying().catch(() => null),
      getRecentlyPlayed().catch(() => null)
    ]);

    let rawTracks = [];

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

    if (recentlyPlayedRes && recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      const recentTracks = recentData.items.map((item: any) => ({
        title: item.track.name,
        artist: item.track.artists.map((_a: any) => _a.name).join(', '),
        url: item.track.external_urls.spotify,
        albumArt: item.track.album.images[item.track.album.images.length - 1]?.url,
        isPlaying: false,
      }));
      rawTracks = [...rawTracks, ...recentTracks];
    }

    const seen = new Set();
    const uniqueTracks = rawTracks.filter(track => {
      const key = `${track.title}-${track.artist}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 5);

    return new Response(JSON.stringify({ tracks: uniqueTracks }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ tracks: [], error: 'API Error' }), { status: 500 });
  }
};