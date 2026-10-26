import React from 'react';
import { useApp } from '../context/AppContext';
import { LIVE_EVENTS_DATA } from '../data/mockData';
import { Radio, Users, Calendar, ArrowRight, Play } from 'lucide-react';

export const HomeLiveTeaser: React.FC = () => {
  const { setCurrentView } = useApp();
  const liveEvent = LIVE_EVENTS_DATA[0];

  if (!liveEvent) return null;

  return (
    <section className="w-full py-14 bg-[#0a0a0a] border-t border-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#121212] via-[#0e0e0e] to-[#141414] border border-[#222] hover:border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 transition-all flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          {/* Left details */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-0.5 rounded flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                NOW STREAMING LIVE
              </span>
              <span className="text-xs text-[#D4AF37] font-semibold tracking-wide">
                Live Broadcast Hub
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {liveEvent.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {liveEvent.description}
            </p>

            <div className="flex items-center gap-6 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <strong className="text-white">{liveEvent.viewersCount?.toLocaleString()}</strong> Live Viewers
              </span>
              <span>·</span>
              <span className="text-neutral-400">Host: {liveEvent.organization}</span>
            </div>
          </div>

          {/* Right preview thumbnail & Action */}
          <div className="w-full lg:w-96 flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <div
              onClick={() => setCurrentView('live-events')}
              className="relative aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer border border-[#2d2d2d]"
            >
              <img
                src={liveEvent.thumbnail}
                alt={liveEvent.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('live-events')}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
            >
              <span>Watch Live Stream & Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
