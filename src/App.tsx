import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#0ff] flex flex-col items-center justify-center p-4 font-mono selection:bg-[#f0f] selection:text-black overflow-hidden relative">
      <div className="scanlines"></div>
      <div className="noise"></div>
      
      <header className="z-10 mb-8 text-center mt-8 tear">
        <h1 className="text-4xl md:text-6xl font-display tracking-tighter text-white glitch-text" data-text="SYS.OVERRIDE">
          SYS.OVERRIDE
        </h1>
        <p className="text-[#f0f] tracking-widest text-2xl mt-2 border-b-4 border-[#0ff] inline-block pb-1">PROTOCOL: SNAKE_AUDIO</p>
      </header>

      <main className="z-10 flex flex-col md:flex-row gap-8 items-center md:items-start max-w-6xl w-full justify-center pb-12">
        <div className="flex-1 w-full max-w-lg border-4 border-[#0ff] bg-black p-1 relative shadow-[8px_8px_0px_#f0f]">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#0ff] animate-pulse"></div>
          <SnakeGame />
        </div>
        <div className="flex-1 w-full max-w-md border-4 border-[#f0f] bg-black p-1 relative shadow-[-8px_8px_0px_#0ff]">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#f0f] animate-pulse"></div>
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}
