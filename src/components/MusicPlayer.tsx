import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: 1, title: "SECTOR_01_SCAN", artist: "AI_NODE_77", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "6:12" },
  { id: 2, title: "MEMORY_LEAK", artist: "SYS_ADMIN", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "7:05" },
  { id: 3, title: "KERNEL_PANIC", artist: "UNKNOWN_ENTITY", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "5:44" }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="bg-black p-4 flex flex-col relative tear" style={{ animationDelay: '1s' }}>
      <audio ref={audioRef} src={currentTrack.url} onTimeUpdate={handleTimeUpdate} onEnded={handleTrackEnd} />

      <div className="flex items-center justify-between mb-4 border-b-4 border-[#f0f] pb-2">
        <h2 className="text-2xl text-[#0ff] tracking-widest">
          AUDIO_STREAM_ACTIVE
        </h2>
        <button onClick={() => setIsMuted(!isMuted)} className="text-[#f0f] hover:text-[#0ff] text-2xl">
          {isMuted ? '[ MUTED ]' : '[ VOL_ON ]'}
        </button>
      </div>

      <div className="w-full h-32 mb-4 bg-[#0ff] relative overflow-hidden flex items-center justify-center border-4 border-[#f0f]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
        {isPlaying ? (
          <div className="flex items-end justify-center gap-2 h-16 w-full px-4">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-[#f0f]"
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animation: `glitch-anim ${0.2 + Math.random() * 0.5}s infinite steps(2)`
                }}
              ></div>
            ))}
          </div>
        ) : (
          <span className="text-black text-3xl font-display">STREAM_PAUSED</span>
        )}
      </div>

      <div className="text-left mb-4 border-l-4 border-[#0ff] pl-2">
        <h3 className="text-3xl text-[#f0f] truncate uppercase">{currentTrack.title}</h3>
        <p className="text-xl text-[#0ff] mt-1 truncate">SRC: {currentTrack.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-6 border-4 border-[#0ff] bg-black cursor-pointer relative" onClick={handleProgressClick}>
          <div className="absolute top-0 left-0 h-full bg-[#f0f]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button onClick={handlePrev} className="flex-1 py-2 bg-black border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black text-2xl">
          [ &lt;&lt; ]
        </button>
        <button onClick={togglePlay} className="flex-1 py-2 bg-[#f0f] text-black hover:bg-white text-2xl font-bold">
          {isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}
        </button>
        <button onClick={handleNext} className="flex-1 py-2 bg-black border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black text-2xl">
          [ &gt;&gt; ]
        </button>
      </div>
      
      {/* Playlist */}
      <div className="mt-2">
        <h4 className="text-xl text-[#f0f] border-b-4 border-[#0ff] mb-2">DATA_TRACKS</h4>
        <div className="space-y-1">
          {TRACKS.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => { setCurrentTrackIndex(index); setIsPlaying(true); }}
              className={`flex items-center justify-between p-2 cursor-pointer border-l-4 text-xl ${
                index === currentTrackIndex ? 'border-[#f0f] bg-[#0ff] text-black' : 'border-transparent hover:border-[#0ff] text-[#0ff]'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-6">0{index + 1}</span>
                <span className="truncate">{track.title}</span>
              </div>
              <span>{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
