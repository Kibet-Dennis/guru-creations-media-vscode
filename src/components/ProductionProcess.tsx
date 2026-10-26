import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProductionProcess: React.FC = () => {
  const { setCurrentView } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Consultation & Vision Discovery',
      desc: 'We analyze your event objectives, venue acoustics, broadcast audience, and narrative goals.',
    },
    {
      num: '02',
      title: 'Planning & Technical Blueprint',
      desc: 'Camera positioning plots, run-of-show cues, RF frequency coordination, and electrical load planning.',
    },
    {
      num: '03',
      title: 'Pre-Production & Tech Rehearsal',
      desc: 'Bonded network speed tests, lighting rigging, wireless mic calibration, and graphics asset staging.',
    },
    {
      num: '04',
      title: 'Multi-Camera Live Production',
      desc: 'Flawless execution by senior directors, steadicam operators, audio engineers, and stream technicians.',
    },
    {
      num: '05',
      title: 'Post-Production & Cinema Color',
      desc: 'DaVinci Resolve HDR color grading, audio stem mastering, dynamic motion graphics, and editorial cut.',
    },
    {
      num: '06',
      title: 'Client Review & 4K Delivery',
      desc: 'Secure cloud proofing via Client Portal, 2 revision passes, and instant high-res master downloads.',
    },
  ];

  return (
    <section className="w-full py-16 bg-[#080808] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Disciplined Execution Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our 6-Stage Production Process
          </h2>
          <p className="text-sm text-neutral-400">
            From initial concept to final 4K broadcast delivery, every second is planned with precision and technical rigor.
          </p>
        </div>

        {/* 6 Steps Grid with Natural Editorial Numbering (conforming to anti-slop guidelines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#1e1e1e] hover:border-[#D4AF37]/40 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-mono text-2xl font-black text-[#D4AF37]/80">
                  {st.num}
                </span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{st.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#181818] flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Quality Gate Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Handoff */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('booking')}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your Production</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
