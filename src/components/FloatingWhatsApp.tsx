import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Popover Bubble */}
      {showTooltip && (
        <div className="bg-[#121216] border border-[#262634] text-white p-3 rounded-2xl shadow-2xl max-w-xs flex items-start gap-2.5 animate-bounce-slight">
          <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] mt-1 shrink-0 animate-ping" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-white">Need quick advice?</p>
            <p className="text-neutral-400 mt-0.5 leading-snug">
              Chat with Dennis & the Guru production desk on WhatsApp!
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-500 hover:text-white text-xs cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Guru%20Media%20Production,%20I%20would%20like%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Guru Media on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-2xl hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all duration-300 group cursor-pointer"
      >
        <MessageSquare className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
