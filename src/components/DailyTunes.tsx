import React, { useState, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  url: string;
  albumArt: string;
  isPlaying: boolean;
}

export default function DailyTunes() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTunes = async () => {
      try {
        const res = await fetch('/api/spotify.json');
        const data = await res.json();
        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Failed to fetch Spotify data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTunes();
    const interval = setInterval(fetchTunes, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse pt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
             <div className="h-10 w-10 bg-sky-100 dark:bg-sky-900/30 rounded-md" />
             <div className="space-y-2">
                <div className="h-3 w-32 bg-sky-100 dark:bg-sky-900/30 rounded" />
                <div className="h-2 w-20 bg-sky-100 dark:bg-sky-900/30 rounded" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm flex flex-col space-y-4">
      <div className="flex items-center gap-2 text-sky-500 font-bold text-xs tracking-widest uppercase">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        Daily Tunes
      </div>

      <div className="space-y-4">
        {tracks.map((track, index) => (
          <a 
            key={index} 
            href={track.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 transition-all duration-300 hover:translate-x-1"
          >
            {/* Number or Animated Bars */}
            <div className="text-[10px] font-bold text-sky-300 dark:text-sky-800 w-3 flex-shrink-0">
              {track.isPlaying ? (
                <span className="flex gap-0.5 items-end h-3 w-3">
                  <span className="w-1 bg-sky-500 animate-[bounce_1s_infinite_0ms]" style={{ height: '60%' }}></span>
                  <span className="w-1 bg-sky-500 animate-[bounce_1s_infinite_200ms]" style={{ height: '100%' }}></span>
                  <span className="w-1 bg-sky-500 animate-[bounce_1s_infinite_400ms]" style={{ height: '80%' }}></span>
                </span>
              ) : index + 1}
            </div>

            {/* Album Art */}
            <div className="w-10 h-10 flex-shrink-0 relative">
              <img 
                src={track.albumArt} 
                alt={track.title} 
                className="w-full h-full rounded-md object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
            </div>

            {/* Title & Artist */}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-sky-900 dark:text-sky-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {track.title}
              </span>
              <span className="text-[11px] text-sky-500/80 dark:text-sky-400/60 truncate italic">
                {track.artist}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}