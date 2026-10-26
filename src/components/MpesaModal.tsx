import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const MpesaModal: React.FC = () => {
  const { mpesaPayment, closeMpesaModal } = useApp();

  if (!mpesaPayment) return null;

  const receiptMessage = [
    'Hello Guru Creations, I have made a manual M-Pesa payment.',
    `Booking reference: ${mpesaPayment.bookingRef}`,
    `Amount: KES ${mpesaPayment.amountKES.toLocaleString()}`,
    'I will provide the M-Pesa receipt code for verification.',
  ].join('\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-instructions-title"
        className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#080808] border-b border-[#1c1c1c]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A859] flex items-center justify-center text-white font-bold text-sm shadow">
              M
            </div>
            <div>
              <h2 id="payment-instructions-title" className="text-sm font-semibold text-white">
                Manual M-Pesa Payment
              </h2>
              <p className="text-[11px] text-neutral-400">Payment gateway is not connected</p>
            </div>
          </div>
          <button
            onClick={closeMpesaModal}
            aria-label="Close payment instructions"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="p-4 bg-[#141414] border border-[#222] rounded-xl space-y-2">
            <p className="text-xs text-neutral-400">Payment for</p>
            <p className="text-sm font-medium text-white">{mpesaPayment.description}</p>
            <div className="flex justify-between gap-4 text-xs">
              <span className="text-neutral-500">Booking reference</span>
              <span className="font-mono text-[#D4AF37]">{mpesaPayment.bookingRef}</span>
            </div>
            <div className="flex justify-between gap-4 text-xs">
              <span className="text-neutral-500">Amount</span>
              <span className="font-mono font-bold text-white">
                KES {mpesaPayment.amountKES.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[#00A859]/30 bg-[#00A859]/5 p-4 space-y-3 text-sm">
            <p className="font-semibold text-white">To pay manually using M-Pesa</p>
            <ol className="list-decimal list-inside space-y-2 text-xs text-neutral-300">
              <li>Open M-Pesa on your phone and choose Lipa na M-Pesa.</li>
              <li>
                Select Pay Bill. Business number:{' '}
                <strong className="font-mono text-[#00A859]">{COMPANY_INFO.mpesaPaybill}</strong>
              </li>
              <li>
                Account number: <strong className="font-mono text-white">{COMPANY_INFO.mpesaAccount}</strong>
              </li>
              <li>Enter the amount shown above and confirm in M-Pesa.</li>
            </ol>
          </div>

          <p className="flex items-start gap-2 text-xs text-amber-200">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            This site does not send STK prompts or verify payments. Never enter your M-Pesa PIN on
            this website. Your booking is confirmed only after the team verifies payment.
          </p>

          <a
            href={getWhatsAppUrl(receiptMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center cursor-pointer shadow-lg"
          >
            Contact Guru Creations on WhatsApp
          </a>

          <button
            onClick={closeMpesaModal}
            className="w-full py-2.5 border border-[#2a2a2a] hover:border-neutral-500 text-neutral-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Close instructions
          </button>
        </div>
      </div>
    </div>
  );
};
