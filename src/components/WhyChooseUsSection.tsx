import React from 'react';
import { WHY_CHOOSE_US_ITEMS } from '../data/mockData';
import { Users, Brain, Lightbulb, TrendingUp, Rocket, Handshake, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhyChooseUsSection: React.FC = () => {
  const { setCurrentView } = useApp();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users className="w-6 h-6 text-[#ff7b00]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#ff2e63]" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#D4AF37]" />;
      case 'ChartLine':
        return <TrendingUp className="w-6 h-6 text-[#007BFF]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#ff7b00]" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-[#10b981]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="w-full py-20 bg-[#080808] border-t border-[#161616] relative overflow-hidden">
      {/* Background subtle gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ff7b00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#ff7b00]">
            <span>Competitive Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">Guru Creations</span>
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            We merge cinematic storytelling, technical engineering, and business strategy to deliver extraordinary value for every client.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0f0f12] border border-[#202028] hover:border-[#ff7b00]/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 shadow-lg shadow-black/40"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-black/60 border border-[#282832] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#ff7b00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a1a20] flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7b00]" />
                  Guaranteed Standard
                </span>
                <span className="text-[11px] text-neutral-500">Guru Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14141c] via-[#121216] to-[#14141c] border border-[#252530] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Have a unique production or digital project in mind?</h4>
            <p className="text-xs text-neutral-400">Our creative directors are available for in-person or virtual consultations in Nairobi.</p>
          </div>
          <button
            onClick={() => setCurrentView('booking')}
            className="px-6 py-3 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white font-semibold text-xs rounded-xl hover:opacity-95 transition-opacity shadow-lg cursor-pointer whitespace-nowrap"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
