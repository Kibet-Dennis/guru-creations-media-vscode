import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_INVENTORY, HERO_IMAGE, BROADCAST_IMAGE, SOUND_IMAGE } from '../data/mockData';
import { Camera, Radio, Volume2, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const EquipmentPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cameras',
    'Livestream & Video Switching',
    'Audio & Sound',
    'Lighting & Grip',
    'Drones & Gimbals',
  ];

  const filteredEquipment =
    selectedCategory === 'All'
      ? EQUIPMENT_INVENTORY
      : EQUIPMENT_INVENTORY.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#181818] pb-8">
          <div>
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              Broadcast-Grade Technical Arsenal
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Production Equipment & Technology
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              We own and deploy tier-1 cinema cameras, hardware video switchers, multi-track digital audio consoles, and licensed drone aircraft.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('booking')}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg"
          >
            Hire Our Gear & Crew
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-[#222] rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e0e0e] border border-[#202020] hover:border-[#D4AF37]/50 rounded-2xl p-6 space-y-4 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="font-mono text-neutral-400 bg-[#161616] px-2 py-0.5 rounded border border-[#262626]">
                    Qty: {item.quantity} in inventory
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{item.name}</h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-mono bg-[#141414] p-3 rounded-xl border border-[#222]">
                  {item.specs}
                </p>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available for Hire
                </span>

                <button
                  onClick={() => setCurrentView('quotation')}
                  className="text-neutral-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Include in Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Redundancy & Power Standards Card */}
        <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#222] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Dual-Slot Recording Redundancy
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every camera records simultaneously to dual high-speed CFexpress / V90 cards. Footage is dumped on-site to rugged RAID hard drives.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Uninterruptible Power (UPS)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All broadcast switchers, monitors, and audio mixing boards operate on zero-transfer battery backups safeguarding against power blackouts.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Starlink & Bonded Cellular
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              LiveU Solo network bonding aggregates multiple networks for uninterrupted transmission from outdoor remote venues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
