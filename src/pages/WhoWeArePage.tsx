import React from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_MEMBERS, WHY_CHOOSE_US_ITEMS, COMPANY_INFO, HERO_IMAGE } from '../data/mockData';
import {
  Users,
  Target,
  Bolt,
  TrendingUp,
  Video,
  Rocket,
  GraduationCap,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Globe,
  ExternalLink,
} from 'lucide-react';

export const WhoWeArePage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-[#1e1e2e] to-[#121212] border border-white/10 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase">
              ABOUT GURU CREATIONS MEDIA
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Who We Are
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
              <strong className="text-white">Guru Creations Media</strong> is a leading digital media and branding agency based in Nairobi, Kenya. We are passionate about helping businesses and individuals build powerful brands and achieve their goals in the digital space.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Our team is made up of creative professionals, strategists, and tech experts who work together to deliver innovative solutions tailored to your needs. We believe in the power of storytelling, data-driven marketing, and cutting-edge technology to drive results.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="p-8 sm:p-10 rounded-2xl bg-[#141419] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff7b00] uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Core Purpose</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              "To empower brands and businesses with creative, effective, and measurable digital solutions that foster growth and lasting impact."
            </p>
          </div>

          <button
            onClick={() => setCurrentView('booking')}
            className="px-6 py-3 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
          >
            Start a Project With Us
          </button>
        </section>

        {/* What We Do */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-wider text-[#ff7b00] uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-white">What We Do</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <Bolt className="w-8 h-8 text-[#ff7b00]" />
              <h3 className="text-lg font-bold text-white">Next-Gen Branding</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Unique brand identities, logo design, color systems, typography, and cohesive brand strategy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <TrendingUp className="w-8 h-8 text-[#ff2e63]" />
              <h3 className="text-lg font-bold text-white">Data-Driven Marketing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Social media management, high-ROI digital ad campaigns, performance metrics, and analytics reporting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <Video className="w-8 h-8 text-[#ff7b00]" />
              <h3 className="text-lg font-bold text-white">High-Quality Content Creation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Cinema-grade 4K videography, drone aerial footage, editorial photography, and graphic design assets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <Rocket className="w-8 h-8 text-[#ff2e63]" />
              <h3 className="text-lg font-bold text-white">Cutting-Edge Advertising</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High-converting digital advertising, influencer collaborations, promotional videos, and brand teasers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <Globe className="w-8 h-8 text-[#ff7b00]" />
              <h3 className="text-lg font-bold text-white">Web Development & Platforms</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Custom full-stack web applications, e-commerce storefronts, and SEO optimization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
              <GraduationCap className="w-8 h-8 text-[#ff2e63]" />
              <h3 className="text-lg font-bold text-white">Consulting & Training</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Executive digital workshops, brand audits, content creation masterclasses, and digital skills training.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-wider text-[#ff7b00] uppercase">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold text-white">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-2 hover:border-[#ff7b00]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff7b00]" />
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Team (All 6 original team members) */}
        <section className="space-y-8 pt-6 border-t border-white/10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-wider text-[#ff7b00] uppercase">
              The Creators Behind Guru Media
            </span>
            <h2 className="text-3xl font-extrabold text-white">Meet Our Team</h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Our talented professionals bring expertise, creativity, and passion to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-4 text-center hover:border-[#ff7b00]/50 transition-all hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-[#ff7b00] to-[#ff2e63] p-1">
                  <div className="w-full h-full rounded-full bg-[#141419] flex items-center justify-center text-xl font-black text-white">
                    {member.name.charAt(0)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#ff7b00] mt-0.5">{member.role}</p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">{member.bio}</p>

                <p className="text-[11px] text-neutral-500 font-mono pt-2 border-t border-white/10">
                  Focus: {member.specialty}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info Footer in Who We Are */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#141419] border border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Get in Touch with Our Studio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Location</p>
                <p className="text-neutral-400">{COMPANY_INFO.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Phone</p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-neutral-400 hover:text-white">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Email</p>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-neutral-400 hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Working Hours</p>
                <p className="text-neutral-400">{COMPANY_INFO.hours}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Guru%20Creations%20Media,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={COMPANY_INFO.personalPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#1f1f27] hover:bg-[#282833] text-white border border-white/15 font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>Founder's Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
