import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Globe, User, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, currency, setCurrency } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Utility Bar (Subdued regional contact & currency, separate from strict Top Bar Contract) */}
      <div className="w-full bg-[#050505] border-b border-[#1b1b1b] text-xs text-neutral-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-neutral-400">Nairobi, Kenya</span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
              <span className="tabular-nums">{COMPANY_INFO.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={COMPANY_INFO.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-neutral-400 hover:text-red-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>YouTube: {COMPANY_INFO.youtubeHandle}</span>
            </a>
            <span className="hidden sm:inline text-neutral-700">·</span>
            <button
              onClick={() => setCurrency(currency === 'KES' ? 'USD' : 'KES')}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              title="Toggle Currency"
            >
              <Globe className="w-3 h-3 text-neutral-400" />
              <span className="font-medium text-[#D4AF37]">{currency}</span>
              <span className="text-neutral-500 text-[10px]">({currency === 'KES' ? 'Ksh' : 'USD'})</span>
            </button>
            <span className="text-neutral-700">·</span>
            <button
              onClick={() => setCurrentView('client-portal')}
              className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                currentView === 'client-portal' ? 'text-[#D4AF37]' : ''
              }`}
            >
              <User className="w-3 h-3" />
              <span>Client Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header strictly adhering to the Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#1b1b1b]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="w-7 h-7 rounded bg-gradient-to-br from-[#D4AF37] to-[#8C7018] text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
              G
            </span>
            <span className="tracking-wider uppercase font-semibold sm:hidden">GURU</span>
            <span className="tracking-wider uppercase font-semibold hidden sm:inline">GURU CREATIONS</span>
          </button>

          {/* Zone 2: clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <button
              onClick={() => setCurrentView('about')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              Who We Are
            </button>
            <button
              onClick={() => setCurrentView('services')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                currentView === 'services' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setCurrentView('portfolio')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                currentView === 'portfolio' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setCurrentView('blog')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'blog' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              <span>Journal</span>
              <span className="text-[10px] bg-[#ff7b00]/20 text-[#ff7b00] border border-[#ff7b00]/30 px-1.5 py-0.2 rounded font-mono">
                Blog
              </span>
            </button>
            <button
              onClick={() => setCurrentView('youtube-media')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'youtube-media' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              <span>Media</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded font-mono">
                YT
              </span>
            </button>
            <button
              onClick={() => setCurrentView('pricing')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                currentView === 'pricing' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                currentView === 'contact' ? 'text-[#ff7b00] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Primary service actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('quotation')}
              className="hidden sm:inline-flex lg:hidden px-3.5 py-1.5 text-xs font-medium text-neutral-300 border border-[#2b2b2b] rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Instant Quote
            </button>
            <button
              onClick={() => setCurrentView('booking')}
              className="px-4 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#e4be42] active:bg-[#c29e2c] rounded-lg transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Production
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0c0c0c] border-b border-[#222] px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                onClick={() => {
                  setCurrentView('services');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Services
              </button>
              <button
                onClick={() => {
                  setCurrentView('portfolio');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Portfolio
              </button>
              <button
                onClick={() => {
                  setCurrentView('youtube-media');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200 flex items-center justify-between"
              >
                <span>Media Channel</span>
                <span className="text-[10px] bg-red-600/30 text-red-400 px-1 rounded">YT</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('live-events');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200 flex items-center justify-between"
              >
                <span>Live Events</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
              <button
                onClick={() => {
                  setCurrentView('pricing');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  setCurrentView('equipment');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Equipment
              </button>
              <button
                onClick={() => {
                  setCurrentView('quotation');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Instant Quote
              </button>
              <button
                onClick={() => {
                  setCurrentView('client-portal');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Client Portal
              </button>
              <button
                onClick={() => {
                  setCurrentView('about');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#181818] text-neutral-200"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
