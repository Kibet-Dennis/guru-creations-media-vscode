import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight, X, Sparkles } from 'lucide-react';

export const OriginalPricingSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState<'starter' | 'pro' | null>(null);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-[#121212] via-[#1e1e2e] to-[#121212] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">
            Our Pricing Plans
          </h2>
          <p className="text-sm text-neutral-300 font-light">
            Choose a plan that fits your needs. No hidden fees, just results-driven services.
          </p>

          {/* Monthly / Yearly Toggle (Save 20%) */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={!isYearly ? 'text-white' : 'text-neutral-400'}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 rounded-full bg-white/20 p-1 relative transition-colors cursor-pointer"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#ff7b00] shadow-md transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={isYearly ? 'text-[#ff7b00] font-bold' : 'text-neutral-400'}>
              Yearly (Save 20%)
            </span>
          </div>
        </div>

        {/* 3 Pricing Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,123,0,0.3)] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#ff7b00] uppercase tracking-wide">
                Starter
              </h3>
              <div className="border-b border-white/10 pb-4">
                <span className="text-4xl font-extrabold text-white">
                  {isYearly ? '$1,799' : '$199'}
                </span>
                <span className="text-xs text-neutral-400"> {isYearly ? '/ year' : '/ month'}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Social Media Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Basic Branding Package</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Monthly Analytics Report</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setSelectedPlanModal('starter')}
                className="w-full py-3 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white text-xs font-bold rounded-xl shadow-lg hover:scale-102 transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="p-8 rounded-2xl bg-[#ff7b00]/10 border-2 border-[#ff7b00] backdrop-blur-md shadow-[0_0_35px_rgba(255,123,0,0.4)] scale-105 hover:scale-108 transition-all flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff7b00] text-black font-extrabold text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full shadow">
              Most Popular
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                Pro
              </h3>
              <div className="border-b border-white/15 pb-4">
                <span className="text-4xl font-extrabold text-white">
                  {isYearly ? '$4,499' : '$499'}
                </span>
                <span className="text-xs text-neutral-300"> {isYearly ? '/ year' : '/ month'}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Advanced Content Creation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>SEO & Digital Advertising</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Bi-Weekly Analytics Report</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setSelectedPlanModal('pro')}
                className="w-full py-3 bg-white hover:bg-neutral-100 text-black text-xs font-bold rounded-xl shadow-lg hover:scale-102 transition-all cursor-pointer"
              >
                Choose Plan
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,123,0,0.3)] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#ff7b00] uppercase tracking-wide">
                Enterprise
              </h3>
              <div className="border-b border-white/10 pb-4">
                <span className="text-2xl font-extrabold text-white">Custom Pricing</span>
                <p className="text-xs text-neutral-400 mt-1">Tailored for large organizations</p>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Full-Scale Branding & Media Strategy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff7b00]" />
                  <span>Weekly Performance Reports</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCurrentView('contact')}
                className="w-full py-3 bg-[#1e1e2e] hover:bg-[#252538] border border-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Details Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#1a1a2e] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedPlanModal === 'starter' ? 'Starter Plan Details' : 'Pro Plan Details'}
                </h3>
                <p className="text-xs text-[#ff7b00]">
                  {selectedPlanModal === 'starter' ? '$199 / month' : '$499 / month'}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
              {selectedPlanModal === 'starter' ? (
                <>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Social Media Management: We handle your posts, engagement, and growth.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Basic Branding Package: Logo, color palette, and brand guidelines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Monthly Analytics Report: Easy-to-read summary of your progress.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Email support included. Cancel anytime, no hidden fees.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Advanced Content Creation: Professional photography, videography, and graphics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>SEO & Digital Advertising: Boost your online visibility and reach.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Bi-Weekly Analytics Report: Track your progress and ROI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                    <span>Priority email support & flexible contract. Cancel anytime.</span>
                  </li>
                </>
              )}
            </ul>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="px-4 py-2 border border-white/20 text-xs text-neutral-300 rounded-xl hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedPlanModal(null);
                  setCurrentView('booking');
                }}
                className="px-5 py-2 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Book This Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
