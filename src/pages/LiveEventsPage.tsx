import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LIVE_EVENTS_DATA, BROADCAST_IMAGE } from '../data/mockData';
import { Radio, Users, Calendar, Clock, Share2, Play, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const LiveEventsPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedEventId, setSelectedEventId] = useState<string>(LIVE_EVENTS_DATA[0].id);

  const activeEvent =
    LIVE_EVENTS_DATA.find((e) => e.id === selectedEventId) || LIVE_EVENTS_DATA[0];

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#181818] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Broadcast Network · East Africa</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Guru Live Events Hub
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              Watch official corporate hybrid summits, global church ministry services, state banquets, and music festivals broadcast live with zero-fail multi-network bonding.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('booking')}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Book a Live Broadcast
            </button>
          </div>
        </div>

        {/* Featured Live Screen / Player Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Broadcast Monitor */}
          <div className="lg:col-span-8 bg-[#0d0d0d] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
            {/* Screen Aspect Container */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={activeEvent.thumbnail}
                alt={activeEvent.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Scrim and Live Indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />

              {/* Status Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  {activeEvent.status === 'live' ? (
                    <span className="bg-red-600/90 text-white font-bold text-xs px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE ON AIR
                    </span>
                  ) : (
                    <span className="bg-neutral-800 text-neutral-300 font-medium text-xs px-2.5 py-1 rounded flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      UPCOMING BROADCAST
                    </span>
                  )}
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs text-neutral-300 border border-white/10">
                    {activeEvent.platform} Stream
                  </span>
                </div>

                {activeEvent.status === 'live' && (
                  <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs text-neutral-200 border border-white/10 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="tabular-nums font-semibold">
                      {activeEvent.viewersCount?.toLocaleString()} watching
                    </span>
                  </div>
                )}
              </div>

              {/* Center Play Graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/90 text-black flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Stream Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-neutral-300">
                <span className="bg-black/80 px-2.5 py-1 rounded border border-white/10 font-mono">
                  1080p 60FPS · SDI 12G Master Audio
                </span>
                <span className="text-neutral-400">Streamed via Starlink + Dual 5G</span>
              </div>
            </div>

            {/* Event Details below monitor */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Host: {activeEvent.organization}
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">{activeEvent.title}</h2>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {activeEvent.description}
                </p>
              </div>

              {/* Run of Show Schedule */}
              <div className="p-4 rounded-xl bg-[#121212] border border-[#1e1e1e] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Broadcast Program Schedule
                </h4>
                <div className="space-y-2">
                  {activeEvent.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between text-xs py-1.5 border-b border-[#1c1c1c] last:border-none"
                    >
                      <span className="font-mono text-[#D4AF37] w-24 shrink-0 font-semibold">
                        {item.time}
                      </span>
                      <span className="text-neutral-300 flex-1">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Other Broadcasts & Technical Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0e0e0e] border border-[#222] rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Upcoming & Recorded Streams
              </h3>

              <div className="space-y-3">
                {LIVE_EVENTS_DATA.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      selectedEventId === evt.id
                        ? 'bg-[#181818] border-[#D4AF37]'
                        : 'bg-[#121212] border-[#222] hover:border-neutral-600'
                    }`}
                  >
                    <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900 relative">
                      <img
                        src={evt.thumbnail}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {evt.status === 'live' && (
                        <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{evt.title}</p>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{evt.organization}</p>
                      <p className="text-[11px] text-[#D4AF37] font-mono mt-1">{evt.scheduledTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Broadcast Reliability Card */}
            <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-[#222] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Zero-Dropout Guarantee
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We eliminate livestream failure. All our outdoor and indoor broadcasts utilize dual-bonded 4G/5G SIMs paired with Starlink high-speed satellite terminals and Blackmagic hardware encoders.
              </p>
              <ul className="text-xs text-neutral-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dual-Sim Safaricom & Airtel Bonded
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Direct Multi-Platform Restreaming
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Isolated ISO Camera Recording
                </li>
              </ul>
              <button
                onClick={() => setCurrentView('quotation')}
                className="w-full py-2.5 bg-[#181818] hover:bg-[#222] text-xs font-semibold text-[#D4AF37] border border-[#333] hover:border-[#D4AF37] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Calculate Broadcast Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
