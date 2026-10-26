import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Smartphone, CheckCircle, ShieldCheck, Printer, ArrowRight, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const MpesaModal: React.FC = () => {
  const { mpesaPayment, closeMpesaModal, markInvoicePaid } = useApp();
  const [phone, setPhone] = useState('0712 984 550');
  const [step, setStep] = useState<'input' | 'push_sent' | 'success'>('input');
  const [simulatedPin, setSimulatedPin] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!mpesaPayment) return null;

  const handleSendStkPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('push_sent');
    }, 1200);
  };

  const handleConfirmPin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Generate realistic 10-char M-Pesa code
      const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      const numbers = '0123456789';
      let code = 'T';
      for (let i = 0; i < 9; i++) {
        code += i % 2 === 0 ? letters.charAt(Math.floor(Math.random() * letters.length)) : numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
      setGeneratedCode(code);
      setIsProcessing(false);
      setStep('success');

      if (mpesaPayment.invoiceId) {
        markInvoicePaid(mpesaPayment.invoiceId, code, 'M-Pesa');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header with Safaricom M-Pesa Green Badge */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080808] border-b border-[#1c1c1c]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A859] flex items-center justify-center text-white font-bold text-sm shadow">
              M
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Safaricom M-Pesa Express</h3>
              <p className="text-[11px] text-neutral-400">Official Payment Gateway · Kenya</p>
            </div>
          </div>
          <button
            onClick={closeMpesaModal}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {step === 'input' && (
            <div className="space-y-5">
              <div className="p-4 bg-[#141414] border border-[#222] rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Payment For</p>
                  <p className="text-sm font-medium text-white">{mpesaPayment.description}</p>
                  <p className="text-xs text-neutral-500 font-mono">Ref: {mpesaPayment.bookingRef}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-400">Amount Due</p>
                  <p className="text-lg font-bold text-[#D4AF37] tabular-nums">
                    KES {mpesaPayment.amountKES.toLocaleString()}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSendStkPush} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    M-Pesa Registered Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712 345 678"
                      required
                      className="w-full bg-[#181818] border border-[#2e2e2e] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00A859] transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    An STK prompt will be sent immediately to this Safaricom phone.
                  </p>
                </div>

                <div className="text-xs text-neutral-400 bg-[#121212] p-3 rounded-lg border border-[#202020] space-y-1">
                  <p className="font-semibold text-neutral-300">Manual Paybill Option:</p>
                  <p>
                    Paybill: <span className="text-[#00A859] font-mono font-bold">{COMPANY_INFO.mpesaPaybill}</span> ·
                    Account: <span className="text-white font-mono">{mpesaPayment.bookingRef || COMPANY_INFO.mpesaAccount}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-[#00A859] hover:bg-[#00924d] active:bg-[#007a40] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Initiating STK Push...</span>
                    </>
                  ) : (
                    <>
                      <span>Send M-Pesa STK Push</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 'push_sent' && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-[#00A859]/10 border border-[#00A859]/30 text-[#00A859] mx-auto flex items-center justify-center animate-pulse">
                <Smartphone className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">Prompt Sent to {phone}</h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  Please check your phone screen. An M-Pesa popup will ask you to enter your 4-digit PIN for{' '}
                  <span className="text-[#D4AF37] font-semibold">KES {mpesaPayment.amountKES.toLocaleString()}</span> to{' '}
                  <span className="text-white font-medium">GURU MEDIA PRODUCTION</span>.
                </p>
              </div>

              {/* Simulation Box for Instant Verification */}
              <div className="p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl text-left space-y-3">
                <p className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A859]" />
                  Simulated STK Push Response
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={simulatedPin}
                    onChange={(e) => setSimulatedPin(e.target.value)}
                    placeholder="Enter 4-digit PIN (e.g. 1234)"
                    className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-center tracking-widest text-white focus:outline-none focus:border-[#00A859]"
                  />
                  <button
                    onClick={handleConfirmPin}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-[#00A859] hover:bg-[#008f4c] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    {isProcessing ? 'Verifying...' : 'Authorize'}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Demo mode: Enter any 4 numbers to test real-time confirmation.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Payment Confirmed!</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Safaricom M-Pesa transaction confirmed and allocated.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-4 bg-[#141414] border border-[#222] rounded-xl text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-[#242424] pb-2">
                  <span className="text-neutral-400">Transaction ID:</span>
                  <span className="text-white font-bold">{generatedCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Paid To:</span>
                  <span className="text-white font-medium">GURU MEDIA PRODUCTION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Paybill:</span>
                  <span className="text-white font-medium">{COMPANY_INFO.mpesaPaybill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Booking Ref:</span>
                  <span className="text-[#D4AF37] font-semibold">{mpesaPayment.bookingRef}</span>
                </div>
                <div className="flex justify-between border-t border-[#242424] pt-2">
                  <span className="text-neutral-400">Amount Paid:</span>
                  <span className="text-emerald-400 font-bold">
                    KES {mpesaPayment.amountKES.toLocaleString()}.00
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Timestamp:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-3 border border-[#2a2a2a] hover:border-neutral-500 text-neutral-300 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Receipt
                </button>
                <button
                  onClick={closeMpesaModal}
                  className="flex-1 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
