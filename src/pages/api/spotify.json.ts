import { getNowPlaying, getRecentlyPlayed } from '../../lib/spotify';

export const GET = async () => {
  try {
    const response = await getNowPlaying();
    let tracks = [];

    // Check if something is playing right now
    if (response.status === 200) {
      const song = await response.json();
      if (song.item) {
        tracks.push({
          title: song.item.name,
          artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
          url: song.item.external_urls.spotify,
          // Get the smallest image
          albumArt: song.item.album.images[song.item.album.images.length - 1]?.url,
          isPlaying: true,
        });
      }
    }

    // Get recently played to fill the list to 5 items
    const recentResponse = await getRecentlyPlayed();
    const recentData = await recentResponse.json();
    
    const recentTracks = recentData.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((_artist: any) => _artist.name).join(', '),
      url: item.track.external_urls.spotify,
      // Get smallest image for recent tracks too
      albumArt: item.track.album.images[item.track.album.images.length - 1]?.url,
      isPlaying: false,
    }));

    // Filter out duplicates and slice to 5
    const allTracks = [...tracks, ...recentTracks]
      .filter((track, index, self) => 
        index === self.findIndex((t) => t.title === track.title)
      )
      .slice(0, 5);

    return new Response(JSON.stringify({ tracks: allTracks }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), { status: 500 });
  }
};