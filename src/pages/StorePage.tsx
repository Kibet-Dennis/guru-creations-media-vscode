import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORE_PRODUCTS } from '../data/mockData';
import { StoreProduct, StoreCategory } from '../types';
import {
  ShoppingBag,
  Sparkles,
  Download,
  ShieldCheck,
  Star,
  CheckCircle2,
  Tag,
  ArrowRight,
  Filter,
  Search,
  SlidersHorizontal,
  Flame,
  Zap,
  Info,
  X,
} from 'lucide-react';

interface StorePageProps {
  onDirectCheckout: (product: StoreProduct) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ onDirectCheckout }) => {
  const { addToCart, formatMoney, currency, setCurrency } = useApp();

  const [activeCategory, setActiveCategory] = useState<StoreCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductDetails, setSelectedProductDetails] = useState<StoreProduct | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const categories: { key: StoreCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Products', icon: '✨' },
    { key: 'digital-assets', label: 'Cinema LUTs & Presets', icon: '⚡' },
    { key: 'merchandise', label: 'Guru Wear Apparel', icon: '👕' },
    { key: 'gear-hire', label: 'Gear & Rig Hire', icon: '🎥' },
    { key: 'masterclass', label: 'Masterclasses & Bootcamps', icon: '🎓' },
    { key: 'sponsorship', label: 'Sponsorships & Placements', icon: '📢' },
  ];

  const filteredProducts = STORE_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#08080a] min-h-screen text-white pt-8 pb-24">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#14141c] via-[#101018] to-[#16121e] border border-[#262638] p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7b00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#ff2e63]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#ff7b00]/30 text-xs font-semibold text-[#ff7b00]">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Guru Digital Store & Creator Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Tools, Gear & Apparel <br />
              <span className="bg-gradient-to-r from-[#ff7b00] via-[#ff2e63] to-[#D4AF37] bg-clip-text text-transparent">
                Engineered for Filmmakers
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              Accelerate your productions with Dennis Kibet’s custom 4K cinema LUTs, Lightroom presets, official Guru Creations Wear, daily camera gear rentals, and livestream masterclasses.
            </p>

            {/* Reassurance strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff7b00]" />
                Automated Instant Digital Delivery
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                M-Pesa STK Push Integrated
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Commercial Usage License
              </span>
            </div>
          </div>
        </div>

        {/* Promo Notification Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#ff7b00]/15 via-[#ff2e63]/10 to-transparent border border-[#ff7b00]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#ff7b00]" />
            <span className="text-white font-medium">
              Special Launch Offer: Use discount coupon <strong className="text-[#ff7b00] font-mono">GURU2026</strong> at checkout for 10% off any digital pack or workshop ticket!
            </span>
          </div>
          <span className="text-neutral-400 text-[11px] whitespace-nowrap">Valid for all East Africa & Diaspora orders</span>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories horizontal tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.key
                      ? 'bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white shadow-lg'
                      : 'bg-[#14141c] border border-[#222230] text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search LUTs, gear, merch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#14141c] border border-[#242434] focus:border-[#ff7b00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-[#0f0f15] border border-[#1e1e2c] hover:border-[#ff7b00]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              {/* Product Visual */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-transparent to-transparent" />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-bold text-[#ff7b00] border border-[#ff7b00]/30 shadow">
                    {product.badge}
                  </span>
                )}

                {/* Format / Duration Pill */}
                {product.formatOrDuration && (
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-300 bg-black/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                    {product.formatOrDuration}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="uppercase text-[10px] tracking-wider font-semibold text-[#D4AF37]">
                      {product.category.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-mono text-white font-semibold">{product.rating}</span>
                      <span className="text-[10px] text-neutral-500">({product.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#ff7b00] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Inclusions summary */}
                <div className="pt-2 border-t border-[#1a1a24] space-y-1">
                  {product.details.slice(0, 2).map((det, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-[#ff7b00] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{det}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Call to Actions */}
                <div className="pt-3 border-t border-[#1c1c28] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-black font-mono text-white">
                        {formatMoney(product.priceKES)}
                      </span>
                      {product.originalPriceKES && (
                        <span className="text-xs font-mono text-neutral-500 line-through ml-2">
                          {formatMoney(product.originalPriceKES)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProductDetails(product);
                        setSelectedOption(product.options ? product.options[0] : '');
                      }}
                      className="text-xs text-[#ff7b00] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Specs</span>
                      <Info className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product, product.options ? product.options[0] : undefined)}
                      className="py-2.5 px-3 bg-[#181824] hover:bg-[#222232] border border-[#2c2c3e] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onDirectCheckout(product)}
                      className="py-2.5 px-3 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all shadow-md cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Instant Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="text-lg font-bold text-white">No products match your search</p>
            <p className="text-xs text-neutral-400">Try adjusting your filters or browse all categories.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-[#1c1c28] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Revenue Guarantee / Trust Section */}
        <div className="mt-16 p-8 rounded-2xl bg-[#0d0d12] border border-[#20202c] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#ff7b00]/15 text-[#ff7b00] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Zero-Wait Digital Delivery</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upon M-Pesa STK push authorization, your download tokens and installation video links are instantly generated and sent to your email.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Verified Production Rigs</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All rental gear (Sony FX6, RED Komodo, DJI Inspire 3) is calibrated, cleaned, and checked by our technical engineers in Westlands, Nairobi.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/15 text-[#007BFF] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Guru Masterclass Community</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Workshop attendees receive lifetime access to our East Africa broadcast community group, live technical Q&As, and job referral network.
            </p>
          </div>
        </div>
      </div>

      {/* Product Full Specs Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121218] border border-[#2c2c3e] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-[#242434] flex items-center justify-between bg-[#161620]">
              <span className="text-xs font-mono font-bold text-[#ff7b00] uppercase tracking-wider">
                {selectedProductDetails.category.replace('-', ' ')}
              </span>
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="w-8 h-8 rounded-full bg-[#20202c] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={selectedProductDetails.thumbnail}
                  alt={selectedProductDetails.title}
                  className="w-full sm:w-56 h-48 object-cover rounded-xl border border-[#2a2a3c] shrink-0"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedProductDetails.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-lg font-black font-mono text-[#ff7b00]">
                      {formatMoney(selectedProductDetails.priceKES)}
                    </span>
                    {selectedProductDetails.originalPriceKES && (
                      <span className="text-xs font-mono text-neutral-500 line-through">
                        {formatMoney(selectedProductDetails.originalPriceKES)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedProductDetails.description}
                  </p>
                </div>
              </div>

              {/* Options selector (for merch sizes) */}
              {selectedProductDetails.options && (
                <div className="space-y-2 pt-2 border-t border-[#20202c]">
                  <label className="text-xs font-semibold text-neutral-300">Select Size / Fit:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProductDetails.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                          selectedOption === opt
                            ? 'bg-[#ff7b00] border-[#ff7b00] text-white'
                            : 'bg-[#181824] border-[#2c2c3e] text-neutral-300 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Inclusions List */}
              <div className="space-y-2 pt-2 border-t border-[#20202c]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  What’s Included in This Package:
                </h4>
                <div className="space-y-2">
                  {selectedProductDetails.details.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ff7b00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#20202c] flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProductDetails, selectedOption || undefined);
                    setSelectedProductDetails(null);
                  }}
                  className="px-5 py-2.5 bg-[#20202c] hover:bg-[#2c2c3e] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    const prod = selectedProductDetails;
                    setSelectedProductDetails(null);
                    onDirectCheckout(prod);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white text-xs font-bold rounded-xl cursor-pointer shadow-lg"
                >
                  Instant Buy with M-Pesa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
