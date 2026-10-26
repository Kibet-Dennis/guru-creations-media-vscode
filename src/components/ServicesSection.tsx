import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES_DATA } from '../data/mockData';
import { Camera, Video, Radio, Volume2, Tv, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { setCurrentView, formatMoney } = useApp();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#D4AF37]" />;
      case 'Video':
        return <Video className="w-5 h-5 text-[#D4AF37]" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-[#D4AF37]" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="w-full py-16 bg-[#080808] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Comprehensive Production Suite
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              World-Class Media Capabilities
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            From single-camera executive interviews to 8-camera stadium broadcasts with simultaneous multi-platform streaming and arena sound reinforcement.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#0d0d0d] border border-[#1e1e1e] hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview with Scrim */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />

                <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#333]">
                  {getIcon(service.iconName)}
                </div>

                <div className="absolute bottom-3 right-4 text-xs font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  From {formatMoney(service.samplePriceKES)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Inclusions Preview */}
                <div className="space-y-1.5 pt-2 border-t border-[#181818]">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#181818] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Full Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => setCurrentView('booking')}
                    className="px-3.5 py-1.5 bg-[#181818] hover:bg-[#D4AF37] text-white hover:text-black border border-[#2e2e2e] hover:border-[#D4AF37] rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Support Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0e0e0e] border border-[#222] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">
              Need On-Site Broadcast Consultation or Custom Rig Setup?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              We configure OBS Studio, vMix live switching, Blackmagic ATEM routing, and audio interfaces for churches, corporate auditoriums, and media houses.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('quotation')}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-md"
            >
              Build Custom Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0e0e0e] border border-[#262626] rounded-2xl overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-[#1c1c1c] pb-4">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Technical Specifications & Scope
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedService.title}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features */}
              <div className="space-y-3 p-4 rounded-xl bg-[#121212] border border-[#202020]">
                <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                  Technical Features & Standards
                </h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feat, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="space-y-3 p-4 rounded-xl bg-[#121212] border border-[#202020]">
                <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                  Final Deliverables
                </h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((del, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gear Highlight */}
            <div className="p-4 bg-[#141414] rounded-xl border border-[#222]">
              <p className="text-xs text-neutral-400 font-semibold mb-2">Dedicated Gear Deployed:</p>
              <div className="flex flex-wrap gap-2">
                {selectedService.equipmentHighlights.map((eq, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#1a1a1a] border border-[#333] px-2.5 py-1 rounded text-neutral-200"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between">
              <div>
                <p className="text-[11px] text-neutral-500">Estimated Base Package</p>
                <p className="text-base font-bold text-white tabular-nums">
                  {formatMoney(selectedService.samplePriceKES)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setCurrentView('quotation');
                  }}
                  className="px-4 py-2 border border-[#333] text-xs font-medium text-neutral-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  Generate Quotation
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setCurrentView('booking');
                  }}
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
