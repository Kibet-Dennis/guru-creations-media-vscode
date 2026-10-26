import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Cookie, ArrowRight } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { setCurrentView } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('guru_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('guru_cookie_consent', 'all');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('guru_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-md bg-[#111116]/95 backdrop-blur-md border border-[#262636] p-5 rounded-2xl shadow-2xl text-white space-y-3 animate-slide-up">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#ff7b00]/20 text-[#ff7b00] flex items-center justify-center">
          <Cookie className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-bold text-white">We Respect Your Privacy</h4>
      </div>

      <p className="text-xs text-neutral-300 leading-relaxed">
        We use cookies and essential local storage to optimize your quoting experience, preserve your currency preferences, and secure client portal sessions in accordance with the Kenya Data Protection Act (2019).
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={acceptAll}
          className="px-4 py-2 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-90 text-white font-semibold text-xs rounded-lg transition-opacity cursor-pointer shadow"
        >
          Accept All
        </button>

        <button
          onClick={acceptEssential}
          className="px-3.5 py-2 bg-[#1b1b24] hover:bg-[#252532] text-neutral-300 hover:text-white text-xs font-medium rounded-lg transition-colors cursor-pointer border border-[#2d2d3c]"
        >
          Essential Only
        </button>

        <button
          onClick={() => {
            setVisible(false);
            setCurrentView('privacy-policy');
          }}
          className="text-xs text-[#ff7b00] hover:underline flex items-center gap-1 ml-auto cursor-pointer"
        >
          <span>Privacy Policy</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
