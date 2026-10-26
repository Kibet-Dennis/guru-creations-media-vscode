import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="w-full bg-[#050505] border-t border-[#181818] text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 pb-12 border-b border-[#181818]">
          {/* Col 1: Brand Info */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#8C7018] text-black font-extrabold flex items-center justify-center text-base shadow">
                G
              </span>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                GURU CREATIONS LTD
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Founded by <strong>Dennis Kibet</strong>, Guru Creations Ltd & Guru Media Production is Kenya’s benchmark for original documentary filmmaking, aerial drone cinematography, 4K videography, multi-camera live broadcasting, and arena sound engineering.
            </p>
            <p className="text-xs text-[#D4AF37] font-medium tracking-wide">
              {COMPANY_INFO.slogan}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <a
                href={COMPANY_INFO.youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600/20 border border-red-500/40 px-2.5 py-1 rounded text-red-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                YouTube: {COMPANY_INFO.youtubeHandle}
              </a>
              <span className="bg-[#121212] border border-[#222] px-2.5 py-1 rounded text-neutral-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                M-Pesa Paybill Available
              </span>
              <span className="bg-[#121212] border border-[#222] px-2.5 py-1 rounded text-neutral-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                KCAA Drone Certified
              </span>
            </div>
          </div>

          {/* Col 2: Production Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-200">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cinematic Videography
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Editorial Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('live-events')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Multi-Camera Livestream
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Live Sound Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Turnkey Event Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('equipment')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Technology & Rigs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-200">
              Company & Portal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('quotation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Quotation Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7b00]" />
                  <span>The Guru Journal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('client-portal')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left font-medium"
                >
                  Client Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Nairobi Headquarters & Contacts */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-200">
              Nairobi Hub
            </h4>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white tabular-nums">
                  {COMPANY_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs">{COMPANY_INFO.hours}</span>
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Guru%20Media%20Production,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#128C7E]/20 hover:bg-[#128C7E]/30 text-[#25D366] border border-[#128C7E]/40 rounded-lg text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Financial & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Guru Creations Ltd & Guru Media Production. All rights reserved.</span>
            <span>·</span>
            <span>Registered in Kenya (CR12 / KRA PIN Compliant)</span>
            <span>·</span>
            <button
              onClick={() => setCurrentView('privacy-policy')}
              className="hover:text-neutral-300 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setCurrentView('terms-of-service')}
              className="hover:text-neutral-300 underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400">Payment:</span>
            <span className="text-white font-semibold">
              M-Pesa Paybill {COMPANY_INFO.mpesaPaybill} · Account {COMPANY_INFO.mpesaAccount}
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400">Equity Bank</span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
