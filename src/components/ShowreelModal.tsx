import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

export const ShowreelModal: React.FC = () => {
  const { showreelOpen, setShowreelOpen, setCurrentView } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [currentChapter, setCurrentChapter] = useState('02. Multi-Camera 4K Live Broadcast');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowreelOpen(false);
    };
    if (showreelOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showreelOpen, setShowreelOpen]);

  // Simulate progress when playing
  useEffect(() => {
    if (!showreelOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        const next = prev + 1;
        if (next < 25) setCurrentChapter('01. Cinema Commercials & Narrative');
        else if (next < 55) setCurrentChapter('02. Multi-Camera 4K Live Broadcast');
        else if (next < 80) setCurrentChapter('03. Luxury Weddings & Galas');
        else setCurrentChapter('04. Arena Sound & Post-Grading');
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [showreelOpen, isPlaying]);

  if (!showreelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-[#252525] rounded-xl overflow-hidden shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c1c1c] bg-[#080808]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              Guru Media Production · Master 4K Showreel (2026 Edition)
            </h3>
          </div>
          <button
            onClick={() => setShowreelOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            aria-label="Close Showreel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src={HERO_IMAGE}
            alt="Guru Media Showreel Frame"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-102"
          />

          {/* Letterbox Cinema Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

          {/* Chapter Badge */}
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
            <span className="bg-black/70 backdrop-blur-md border border-[#333] px-3 py-1 rounded text-xs text-[#D4AF37] font-medium tracking-wide">
              {currentChapter}
            </span>
            <span className="hidden sm:inline bg-black/70 backdrop-blur-md border border-[#333] px-2.5 py-1 rounded text-[11px] text-neutral-400">
              6K RAW · DaVinci Wide Gamut
            </span>
          </div>

          {/* Center Play/Pause Overlay indicator on click */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/90 text-black flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110">
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </div>
          </button>

          {/* Bottom Player Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubber Bar */}
            <div
              className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#AA820A] to-[#D4AF37] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="tabular-nums font-mono text-[11px] text-neutral-400">
                  {Math.floor((progress / 100) * 180)}s / 180s
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-neutral-400 text-[11px]">
                  4K UHD 60FPS · 24-bit 48kHz Stereo
                </span>
                <button
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen?.();
                    }
                  }}
                  className="hover:text-white cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Filmed on location in Nairobi, Naivasha, Mombasa & Maasai Mara</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setShowreelOpen(false);
                setCurrentView('portfolio');
              }}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-neutral-300 border border-[#262626] rounded-lg hover:border-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              View Full Portfolio
            </button>
            <button
              onClick={() => {
                setShowreelOpen(false);
                setCurrentView('booking');
              }}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#e4be42] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Book This Crew
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
