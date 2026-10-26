import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Camera, Clapperboard, Mic2, Radio } from 'lucide-react';

const services = [
  {
    title: 'Cinematic Video Production',
    description: 'Story-led films, documentaries, commercials, and event coverage.',
    icon: Clapperboard,
  },
  {
    title: 'Live Broadcast & Streaming',
    description: 'Multi-camera livestreams, broadcast crews, and reliable event coverage.',
    icon: Radio,
  },
  {
    title: 'Event Photography',
    description: 'Professional photography for corporate events, celebrations, and campaigns.',
    icon: Camera,
  },
  {
    title: 'Sound & Event Production',
    description: 'Experienced sound engineers and technical production for live events.',
    icon: Mic2,
  },
];

export const HomeRevenueTeaser: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="w-full py-20 bg-[#09090c] border-t border-[#181824] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff7b00]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#ff7b00]">
            Professional Media Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hire the crew. We’ll handle the production.
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Guru Creations provides the people, production equipment, and expertise for your project.
            Tell us what you need and we’ll prepare a tailored quote—no equipment or products for sale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="p-6 rounded-2xl bg-[#0f0f15] border border-[#20202c] hover:border-[#ff7b00]/50 transition-colors space-y-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#ff7b00]/10 border border-[#ff7b00]/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#ff7b00]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{description}</p>
              </div>
              <button
                onClick={() => setCurrentView('booking')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
              >
                Request a service quote
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentView('pricing')}
            className="px-5 py-3 bg-[#161622] hover:bg-[#202030] border border-[#2c2c3e] hover:border-[#ff7b00] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            View production packages
          </button>
          <button
            onClick={() => setCurrentView('quotation')}
            className="px-5 py-3 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Build a custom quote
          </button>
        </div>
      </div>
    </section>
  );
};
