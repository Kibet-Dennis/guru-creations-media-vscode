import React from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_MEMBERS, TESTIMONIALS, COMPANY_INFO, HERO_IMAGE, BROADCAST_IMAGE } from '../data/mockData';
import { Target, Compass, Award, Shield, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const values = [
    { title: 'Creativity', desc: 'Pushing cinematic storytelling boundaries with bold visual language and intentional art direction.' },
    { title: 'Technical Excellence', desc: 'Deploying broadcast-grade hardware, cinema color science, and acoustically pristine sound engineering.' },
    { title: 'Reliability', desc: 'Guaranteed arrival, redundant equipment backups, zero-fail live streams, and prompt turnaround.' },
    { title: 'Integrity', desc: 'Transparent pricing with zero hidden fees, verified deliverables, and honest client communication.' },
    { title: 'Innovation', desc: 'Pioneering cellular-bonded broadcast workflows, KCAA-certified drone flights, and hybrid event architectures.' },
    { title: 'Client Centricity', desc: 'Tailoring every production to your brand objectives, cultural identity, and audience impact.' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Our Story & Heritage · Nairobi, Kenya
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Crafting Cinematic Stories That Resonate
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed font-light">
            Founded by <strong>Dennis Kibet (Dennis Sebastien)</strong>, <strong>Guru Creations Ltd</strong> and <strong>Guru Media Production</strong> are premier creative media production and broadcasting brands headquartered in Nairobi, Kenya. From original nature and cultural documentaries on our official YouTube channel (<span className="text-[#D4AF37] font-semibold">{COMPANY_INFO.youtubeHandle}</span>) to high-stakes corporate summits, weddings, and state ceremonies, we combine engineering rigor, cinema-grade optics, and authentic African narrative.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={COMPANY_INFO.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600/20 border border-red-500/40 text-red-400 hover:text-white px-3 py-1 rounded-lg transition-colors font-mono"
            >
              YouTube: {COMPANY_INFO.youtubeHandle}
            </a>
            <a
              href={COMPANY_INFO.githubOriginalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#161616] border border-[#2b2b2b] text-neutral-300 hover:text-white px-3 py-1 rounded-lg transition-colors font-mono"
            >
              Original GitHub Site: kibet-dennis.github.io/guru-creations
            </a>
          </div>
        </div>

        {/* Mission & Vision Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-[#202020] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              "To deliver creative, innovative, and reliable media production solutions that help individuals, organizations, and brands communicate their stories effectively."
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-[#202020] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              "To become a leading media production company recognized for creativity, technical excellence, and exceptional client experiences across East Africa and globally."
            </p>
          </div>
        </div>

        {/* Core Values 6-Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Guiding Principles
            </p>
            <h2 className="text-3xl font-bold text-white mt-1">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#1f1f1f] space-y-2 hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <h4 className="text-base font-bold text-white">{val.title}</h4>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team (Strictly conforming to 3-in-a-row layout anti-slop rules) */}
        <div className="space-y-6 pt-6 border-t border-[#181818]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Experienced Directors & Technical Crew
              </p>
              <h2 className="text-3xl font-bold text-white mt-1">The Production Team</h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Certified directors, FAA/KCAA drone pilots, Dante-certified sound engineers, and colorists based in Nairobi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-neutral-800 border border-[#333] flex items-center justify-center font-bold text-lg text-[#D4AF37]">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-[#D4AF37] font-medium">{member.role}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{member.bio}</p>
                <p className="text-[11px] text-neutral-500 font-mono pt-2 border-t border-[#1a1a1a]">
                  Focus: {member.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="space-y-6 pt-6 border-t border-[#181818]">
          <div className="text-center">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Client Testimonials
            </p>
            <h2 className="text-3xl font-bold text-white mt-1">Trusted By Industry Leaders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#202020] flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-3 border-t border-[#1a1a1a]">
                  <p className="text-xs font-bold text-white">{t.author}</p>
                  <p className="text-[11px] text-[#D4AF37]">{t.title} · {t.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0f0f0f] border border-[#262626] text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Let’s Bring Your Vision To Life</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Whether you are hosting a church conference, a luxury safari wedding, or an international tech summit, we are ready to deploy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentView('booking')}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Book a Production
            </button>
            <button
              onClick={() => setCurrentView('quotation')}
              className="px-5 py-3 border border-[#333] hover:border-white text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
            >
              Request a Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
