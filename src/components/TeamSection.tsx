import React from 'react';
import { TEAM_MEMBERS, COMPANY_INFO } from '../data/mockData';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#070709] border-t border-[#14141a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#ff7b00]">
            <Award className="w-3.5 h-3.5" />
            <span>Leadership & Creatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Our <span className="bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">Creative Team</span>
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Led by founders and certified professionals with a unified obsession with cinematic precision and technical mastery.
          </p>
        </div>

        {/* 6 Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-[#0e0e13] border border-[#1e1e28] hover:border-[#ff7b00]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-5 group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1c1c26] to-[#0f0f16] border border-[#282838] flex items-center justify-center font-bold text-xl text-[#ff7b00] group-hover:scale-105 transition-transform">
                    {member.name.charAt(0)}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#161622] border border-[#242436] text-[11px] font-semibold text-[#ff7b00]">
                    {member.role}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff7b00] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                    {member.specialty}
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#181822] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Nairobi Resident
                </span>

                {member.name === 'Dennis Kibet' && (
                  <a
                    href={COMPANY_INFO.personalPortfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ff7b00] hover:underline"
                  >
                    <span>View Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
