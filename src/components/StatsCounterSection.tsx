import React from 'react';
import { Award, Users, Video, Calendar, ShieldCheck } from 'lucide-react';

export const StatsCounterSection: React.FC = () => {
  const stats = [
    {
      value: '150+',
      label: 'Projects Completed',
      subtext: 'Films, livestreams & branding campaigns',
      icon: <Video className="w-5 h-5 text-[#ff7b00]" />,
    },
    {
      value: '95+',
      label: 'Happy Clients',
      subtext: 'Churches, corporate & global brands',
      icon: <Users className="w-5 h-5 text-[#ff2e63]" />,
    },
    {
      value: '12+',
      label: 'Industry Awards & Honors',
      subtext: 'Recognized for creative storytelling',
      icon: <Award className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      value: '5+',
      label: 'Years of Excellence',
      subtext: 'Serving East Africa & diaspora clients',
      icon: <Calendar className="w-5 h-5 text-[#007BFF]" />,
    },
  ];

  return (
    <section className="w-full py-14 bg-[#0a0a0d] border-t border-b border-[#181820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0f0f14] border border-[#22222c] hover:border-[#ff7b00]/40 transition-colors flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-black/60 border border-[#282835] group-hover:scale-105 transition-transform">
                  {item.icon}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight group-hover:text-[#ff7b00] transition-colors">
                  {item.value}
                </p>
                <p className="text-sm font-bold text-neutral-200 mt-1">
                  {item.label}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
