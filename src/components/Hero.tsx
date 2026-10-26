import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Calendar, Calculator, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

export const Hero: React.FC = () => {
  const { setCurrentView, setShowreelOpen } = useApp();

  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-[#080808]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Split-screen Hero (2-Column Balanced) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Kicker with clean text separator (No static pills) */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">
                Nairobi, Kenya
              </span>
              <span aria-hidden="true">·</span>
              <span>Where Creativity Meets Technology</span>
              <span aria-hidden="true">·</span>
              <span>4K / 6K Cinema & Broadcast</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              GURU CREATIONS <br />
              <span className="gold-gradient-text">MEDIA PRODUCTION</span>
            </h1>

            {/* Slogan & Supporting Description */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
              "Capturing Moments. Creating Experiences. Delivering Excellence." Founded by Dennis Kibet, we bring authentic stories to life through aerial drone cinematography, 4K documentary filmmaking, high-fashion photography, multi-camera broadcasting, and world-class event production.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('booking')}
                className="px-6 py-3 text-sm font-semibold text-black bg-[#D4AF37] hover:bg-[#e4be42] active:bg-[#c29e2c] rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Production</span>
              </button>

              <button
                onClick={() => setCurrentView('youtube-media')}
                className="px-5 py-3 text-sm font-medium text-white bg-[#141414] hover:bg-[#1f1f1f] border border-[#2d2d2d] hover:border-red-500 rounded-xl transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                <span>Watch @gurucreationltd</span>
              </button>

              <button
                onClick={() => setShowreelOpen(true)}
                className="px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-800 border border-[#333] group-hover:border-[#D4AF37] flex items-center justify-center text-[#D4AF37] transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-4 border-t border-[#1a1a1a] flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                KCAA Certified Drone Pilots
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                LiveU Bonded Internet Failover
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Available for East Africa & Diaspora
              </span>
            </div>
          </div>

          {/* Right Column: Visual Container at matching height */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#222] bg-[#0f0f0f] shadow-2xl flex flex-col justify-end group min-h-[360px] lg:min-h-[460px]">
            <img
              src={HERO_IMAGE}
              alt="Guru Media Production Crew on Live Cinema Set"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

            {/* Interactive Showreel Trigger Button directly inside visual */}
            <div className="relative z-10 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Official 2026 Showreel
                  </p>
                  <h3 className="text-lg font-bold text-white">Behind The Master Lens</h3>
                </div>
                <button
                  onClick={() => setShowreelOpen(true)}
                  className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer"
                  title="Play 4K Showreel"
                  aria-label="Play 4K Showreel"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Featuring RED Komodo 6K, multi-camera live broadcast switching, and concert sound reinforcement.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI strip below the split (strictly complying with 2-column hero balance rule) */}
        <div className="mt-14 pt-8 border-t border-[#181818] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1c1c1c]">
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">450+</p>
            <p className="text-xs text-neutral-400 mt-1">Productions & Broadcasts Delivered</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1c1c1c]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tabular-nums">100%</p>
            <p className="text-xs text-neutral-400 mt-1">Live Broadcast Zero-Dropout Guarantee</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1c1c1c]">
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">6K RAW</p>
            <p className="text-xs text-neutral-400 mt-1">Cinema & Uncompressed Multi-Track</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1c1c1c]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tabular-nums">24-48h</p>
            <p className="text-xs text-neutral-400 mt-1">Express Sneak-Peek Proofing Turnaround</p>
          </div>
        </div>
      </div>
    </section>
  );
};
