import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PACKAGES_DATA, FAQS } from '../data/mockData';
import { Check, ArrowRight, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setCurrentView, formatMoney, currency, setCurrency } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'photography', label: 'Photography' },
    { id: 'videography', label: 'Videography' },
    { id: 'livestreaming', label: 'Livestreaming' },
    { id: 'corporate', label: 'Corporate & Summits' },
  ];

  const filteredPackages =
    activeCategory === 'all'
      ? PACKAGES_DATA
      : PACKAGES_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header with Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#181818] pb-8">
          <div>
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              Transparent Production Investment
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Production Packages & Rates
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              All packages include master cinema equipment, certified technical crew, calibrated post-production grading, and redundant cloud backup.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-3 bg-[#121212] border border-[#222] p-1.5 rounded-xl">
            <span className="text-xs text-neutral-400 px-2 font-medium">Currency:</span>
            <button
              onClick={() => setCurrency('KES')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                currency === 'KES'
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              KES (Shillings)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-[#222] rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-[#0d0d0d] border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'border-[#D4AF37] shadow-xl gold-border-glow'
                  : 'border-[#202020] hover:border-neutral-600'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md">
                  Most Requested Tier
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-[#D4AF37] font-medium mt-1">{pkg.duration}</p>
                </div>

                <div className="border-y border-[#1a1a1a] py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                      {formatMoney(pkg.priceKES)}
                    </span>
                    <span className="text-xs text-neutral-500">/ production</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    50% deposit locks date · Remainder upon delivery
                  </p>
                </div>

                {/* Inclusions */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Package Inclusions:
                  </p>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Deliverables:
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.deliverables.map((del, i) => (
                      <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-8">
                <button
                  onClick={() => setCurrentView('booking')}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    pkg.popular
                      ? 'bg-[#D4AF37] hover:bg-[#e4be42] text-black'
                      : 'bg-[#181818] hover:bg-[#222] text-white border border-[#2e2e2e]'
                  }`}
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Quotation Banner */}
        <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#262626] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Need a Multi-Day or Custom Production Scope?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Use our live quotation generator to specify the exact camera count, drone flight hours, translation audio setups, and travel distance across Kenya.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('quotation')}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-lg"
          >
            Launch Instant Quote Generator
          </button>
        </div>

        {/* Pricing FAQs */}
        <div className="pt-8 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0e0e0e] border border-[#1f1f1f] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-[#1a1a1a] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
