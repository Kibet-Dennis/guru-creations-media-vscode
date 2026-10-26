import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoreProduct, CartItem, StoreOrder } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import {
  X,
  Smartphone,
  CreditCard,
  Building,
  CheckCircle2,
  Download,
  Ticket,
  Package,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface InstantCheckoutModalProps {
  directProduct?: StoreProduct | null;
  onClose: () => void;
}

export const InstantCheckoutModal: React.FC<InstantCheckoutModalProps> = ({
  directProduct,
  onClose,
}) => {
  const { cart, cartTotalKES, clearCart, addStoreOrder, formatMoney } = useApp();

  // If direct product passed, check that out; otherwise check out cart
  const checkoutItems: CartItem[] = directProduct
    ? [{ product: directProduct, quantity: 1 }]
    : cart;

  const totalAmount = directProduct
    ? directProduct.priceKES
    : cartTotalKES;

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('0700545425');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'M-Pesa' | 'Card' | 'Bank Transfer'>('M-Pesa');

  // Checkout State Machine
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [stkTimer, setStkTimer] = useState(10);
  const [completedOrder, setCompletedOrder] = useState<StoreOrder | null>(null);

  const hasPhysicalMerch = checkoutItems.some(
    (item) => item.product.category === 'merchandise' || item.product.category === 'gear-hire'
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    setStep('processing');

    // Simulate M-Pesa STK Push
    let timeLeft = 6;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setStkTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        // Create order
        const receiptCode = 'SDA' + Math.floor(100000 + Math.random() * 900000) + 'KP';
        const newOrder: StoreOrder = {
          id: 'ord-' + Date.now(),
          orderNumber: 'GORD-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
          date: 'Just now',
          customerName,
          customerEmail,
          customerPhone,
          items: checkoutItems,
          subtotalKES: totalAmount,
          discountKES: 0,
          totalKES: totalAmount,
          paymentMethod,
          mpesaReceiptCode: receiptCode,
          status: 'Completed',
          downloadAccessGranted: true,
        };

        addStoreOrder(newOrder);
        setCompletedOrder(newOrder);
        setStep('success');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#101016] border border-[#28283a] w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl text-white relative">
        {/* Header */}
        <div className="p-5 border-b border-[#20202c] flex items-center justify-between bg-[#14141d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff7b00] animate-pulse" />
            <h3 className="text-base font-bold text-white">
              {step === 'success' ? 'Order Confirmed & Receipt' : 'Secure Express Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1e28] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content depending on step */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Summary Strip */}
              <div className="p-4 rounded-xl bg-[#151520] border border-[#242436] space-y-2">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Purchasing ({checkoutItems.length} {checkoutItems.length === 1 ? 'item' : 'items'})
                </p>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {checkoutItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-neutral-200 line-clamp-1">
                        {item.quantity}x {item.product.title}
                        {item.selectedOption ? ` (${item.selectedOption})` : ''}
                      </span>
                      <span className="font-mono text-white font-semibold shrink-0 ml-2">
                        {formatMoney(item.product.priceKES * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#20202e] flex justify-between items-center text-sm font-bold">
                  <span>Total Amount Due</span>
                  <span className="text-[#ff7b00] font-mono text-base">{formatMoney(totalAmount)}</span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Contact & Delivery Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dennis Kibet"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#181824] border border-[#2c2c3e] focus:border-[#ff7b00] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Email Address (For downloads) *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@gurucreations.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#181824] border border-[#2c2c3e] focus:border-[#ff7b00] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">
                    Safaricom M-Pesa Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-[#181824] border border-[#2c2c3e] rounded-xl text-xs text-neutral-400 flex items-center font-mono">
                      +254
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="700545425"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="flex-1 bg-[#181824] border border-[#2c2c3e] focus:border-[#ff7b00] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    An instant STK payment prompt will be dispatched directly to this phone.
                  </p>
                </div>

                {hasPhysicalMerch && (
                  <div className="space-y-1 pt-1">
                    <label className="text-xs text-neutral-400">Nairobi Pickup / Delivery Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Westlands Commercial Center, Office 302"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-[#181824] border border-[#2c2c3e] focus:border-[#ff7b00] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('M-Pesa')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'M-Pesa'
                        ? 'bg-[#25D366]/20 border-[#25D366] text-white shadow-lg'
                        : 'bg-[#161622] border-[#262638] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#25D366]" />
                    <span>M-Pesa STK</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'bg-[#ff7b00]/20 border-[#ff7b00] text-white shadow-lg'
                        : 'bg-[#161622] border-[#262638] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#ff7b00]" />
                    <span>Card (Visa/MC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'Bank Transfer'
                        ? 'bg-[#007BFF]/20 border-[#007BFF] text-white shadow-lg'
                        : 'bg-[#161622] border-[#262638] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#007BFF]" />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Authorize {formatMoney(totalAmount)} via {paymentMethod}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center text-center space-y-5 animate-fade-in">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff7b00]/20 border-t-[#ff7b00] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-white">
                  {stkTimer}s
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">
                  Sending Safaricom M-Pesa STK Push...
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Please check your phone <strong>+254 {customerPhone}</strong> and enter your M-Pesa PIN to complete payment of{' '}
                  <strong className="text-white">{formatMoney(totalAmount)}</strong> to Guru Creations Ltd.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#161622] border border-[#242436] text-[11px] text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted 256-bit Kenyan Banking Gateway · Zero Fraud Tolerance</span>
              </div>
            </div>
          )}

          {step === 'success' && completedOrder && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Payment Successful & Verified!</h4>
                <p className="text-xs text-emerald-200">
                  M-Pesa Receipt Code: <span className="font-mono font-bold">{completedOrder.mpesaReceiptCode}</span>
                </p>
                <p className="text-[11px] text-neutral-400 font-mono">
                  Order Reference: {completedOrder.orderNumber}
                </p>
              </div>

              {/* Digital Assets Immediate Download Box */}
              <div className="space-y-3">
                <h5 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ff7b00]" />
                  <span>Your Instant Deliverables & Access</span>
                </h5>

                <div className="space-y-2">
                  {completedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#141420] border border-[#242438] flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{item.product.title}</p>
                        <p className="text-[11px] text-neutral-400">
                          {item.product.category === 'digital-assets'
                            ? `Format: ${item.product.formatOrDuration} · ${item.product.downloadSize}`
                            : item.product.category === 'masterclass'
                            ? `Ticket: 1x Confirmed Attendee · ${customerName}`
                            : `Status: Dispatched via Nairobi Courier`}
                        </p>
                      </div>

                      {item.product.category === 'digital-assets' ? (
                        <a
                          href="#download"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              `Initiating secure 4K download for "${item.product.title}". Licensed to ${customerEmail}.`
                            );
                          }}
                          className="px-3.5 py-1.5 bg-[#ff7b00] hover:bg-[#ff9224] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .ZIP</span>
                        </a>
                      ) : item.product.category === 'masterclass' ? (
                        <div className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 text-purple-300 rounded-lg text-xs font-mono flex items-center gap-1">
                          <Ticket className="w-3 h-3" />
                          <span>E-Ticket QR</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-amber-600/30 border border-amber-500/50 text-amber-300 rounded-lg text-xs font-mono flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          <span>In Logistics</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#151520] border border-[#262638] text-xs text-neutral-300 space-y-1">
                <p>
                  A copy of this digital invoice and permanent download token has been sent to{' '}
                  <strong className="text-white">{customerEmail}</strong>.
                </p>
                <p className="text-neutral-500 text-[11px]">
                  Need support or studio assistance? Call Dennis Kibet directly at {COMPANY_INFO.phone}.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#1e1e28] hover:bg-[#282836] text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Close & Return to Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
