import React from 'react';
import { useApp } from '../context/AppContext';
import { STORE_PRODUCTS } from '../data/mockData';
import { ShoppingBag, Sparkles, Download, Video, ArrowRight, CheckCircle2, Flame, Star, Zap } from 'lucide-react';

export const HomeRevenueTeaser: React.FC = () => {
  const { setCurrentView, formatMoney, addToCart, setActiveCheckoutProduct } = useApp();

  // Top 4 featured revenue items (1 from each key stream)
  const featured = [
    STORE_PRODUCTS[0], // Savannah 4K LUT Pack (Digital asset)
    STORE_PRODUCTS[4], // Signature Hoodie (Guru Wear merch)
    STORE_PRODUCTS[8], // Sony FX6 Kit (Gear hire)
    STORE_PRODUCTS[12], // Livestream Masterclass (Academy)
  ];

  return (
    <section className="w-full py-20 bg-[#09090c] border-t border-[#181824] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff7b00]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161622] border border-[#ff7b00]/30 text-xs font-semibold text-[#ff7b00]">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Digital Store & Creator Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tools, Gear & Apparel <br />
              <span className="bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">
                For East Africa’s Creative Industry
              </span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
              Equip your creative workflow with 4K cinema LUTs, official Guru Creations streetwear, daily cinema camera rentals, and broadcast engineering bootcamps.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('store')}
            className="px-6 py-3 bg-[#161622] hover:bg-[#202030] border border-[#2c2c3e] hover:border-[#ff7b00] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 self-start md:self-end group shadow-lg"
          >
            <span>Explore Full Creator Store</span>
            <ArrowRight className="w-4 h-4 text-[#ff7b00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Multi-Stream Revenue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl bg-[#0f0f15] border border-[#20202c] hover:border-[#ff7b00]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#ff7b00] border border-white/10">
                  {prod.badge || prod.category.replace('-', ' ')}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  {prod.formatOrDuration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-white font-mono font-bold text-[11px]">{prod.rating}</span>
                    <span className="text-[10px] text-neutral-500">({prod.reviewCount} reviews)</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#ff7b00] transition-colors line-clamp-1">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1a1a24] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-black font-mono text-white">
                      {formatMoney(prod.priceKES)}
                    </span>
                    {prod.originalPriceKES && (
                      <span className="text-xs font-mono text-neutral-500 line-through">
                        {formatMoney(prod.originalPriceKES)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(prod, prod.options ? prod.options[0] : undefined)}
                      className="py-2 px-2 bg-[#181822] hover:bg-[#222230] border border-[#2a2a3c] text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Cart</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCheckoutProduct(prod);
                      }}
                      className="py-2 px-2 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow transition-all"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars of Guru Revenue Ecosystem */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14141d] via-[#101018] to-[#14141d] border border-[#242434] grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-3 space-y-1">
            <p className="font-mono text-xl font-black text-[#ff7b00]">100%</p>
            <p className="text-xs font-bold text-white">Digital Profit Margins</p>
            <p className="text-[11px] text-neutral-400">Automated LUTs & Preset downloads</p>
          </div>
          <div className="p-3 space-y-1">
            <p className="font-mono text-xl font-black text-[#ff2e63]">M-Pesa</p>
            <p className="text-xs font-bold text-white">STK Push Integrated</p>
            <p className="text-[11px] text-neutral-400">Instant Kenyan shilling receipts</p>
          </div>
          <div className="p-3 space-y-1">
            <p className="font-mono text-xl font-black text-[#D4AF37]">24h</p>
            <p className="text-xs font-bold text-white">Gear Rental Dispatch</p>
            <p className="text-[11px] text-neutral-400">Westlands Nairobi studio pickup</p>
          </div>
          <div className="p-3 space-y-1">
            <p className="font-mono text-xl font-black text-[#007BFF]">B2B</p>
            <p className="text-xs font-bold text-white">Broadcast Sponsorships</p>
            <p className="text-[11px] text-neutral-400">Stream & YouTube brand integrations</p>
          </div>
        </div>
      </div>
    </section>
  );
};
