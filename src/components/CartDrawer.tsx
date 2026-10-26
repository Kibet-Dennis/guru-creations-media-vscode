import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Tag } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalKES,
    cartItemCount,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    formatMoney,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GURU2026' || code === 'DENNIS10' || code === 'CREATOR') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "GURU2026" for 10% off.');
      setDiscountPercent(0);
      setPromoApplied(false);
    }
  };

  const discountAmount = Math.round((cartTotalKES * discountPercent) / 100);
  const finalTotal = cartTotalKES - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-[#0f0f14] border-l border-[#262634] text-white flex flex-col h-full shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-[#20202c] flex items-center justify-between bg-[#121218]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff7b00]/20 text-[#ff7b00] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your Cart</h3>
              <p className="text-xs text-neutral-400">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-[#1c1c26] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-neutral-400">
              <div className="w-16 h-16 rounded-full bg-[#181822] flex items-center justify-center text-neutral-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-white">Your cart is empty</p>
              <p className="text-xs leading-relaxed max-w-xs">
                Explore our 4K Cinema LUTs, Lightroom Presets, Guru Wear streetwear, gear rentals, and livestream workshops.
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedOption || 'def'}-${idx}`}
                  className="p-3.5 rounded-xl bg-[#14141c] border border-[#222230] flex gap-3.5 group"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-18 h-18 rounded-lg object-cover bg-neutral-900 border border-[#2c2c3e] shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#ff7b00] transition-colors">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                          className="text-neutral-500 hover:text-red-400 text-xs cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedOption && (
                        <p className="text-[11px] text-[#ff7b00] font-medium mt-0.5">
                          Option: {item.selectedOption}
                        </p>
                      )}

                      <p className="text-xs font-mono font-bold text-white mt-1">
                        {formatMoney(item.product.priceKES * item.quantity)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#1c1c28] border border-[#2c2c3e] rounded-lg">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedOption
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedOption
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {item.product.category === 'digital-assets' && (
                        <span className="text-[10px] text-emerald-400 font-mono">
                          ⚡ Instant Download
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#20202c] bg-[#121218] space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. GURU2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#181822] border border-[#282838] focus:border-[#ff7b00] rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase placeholder:text-neutral-600 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#222230] hover:bg-[#2c2c3e] text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                10% discount applied! You saved {formatMoney(discountAmount)}.
              </p>
            )}

            {promoError && (
              <p className="text-[11px] text-red-400">{promoError}</p>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono">{formatMoney(cartTotalKES)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span className="font-mono">-{formatMoney(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#222230]">
                <span>Total Due</span>
                <span className="font-mono text-[#ff7b00]">{formatMoney(finalTotal)}</span>
              </div>
            </div>

            {/* M-Pesa Checkout Trigger */}
            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                onCheckout();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Checkout with M-Pesa / Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Safaricom M-Pesa Verified Merchant · Instant Receipts</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
