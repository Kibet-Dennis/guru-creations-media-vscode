import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-20 bg-[#08080a] border-t border-[#161620]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#ff7b00]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-sm text-neutral-400">
            Clear guidelines on booking, equipment, broadcast bonding, payments, and delivery timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0f0f14] border border-[#1e1e28] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#14141c] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ff7b00] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#181822]/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout */}
        <div className="p-6 rounded-2xl bg-[#121218] border border-[#22222e] text-center space-y-3">
          <p className="text-xs sm:text-sm text-neutral-300">
            Still have questions or need a custom multi-camera technical site survey?
          </p>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Guru%20Media,%20I%20have%20a%20question%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 rounded-xl text-xs font-semibold transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp: {COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
