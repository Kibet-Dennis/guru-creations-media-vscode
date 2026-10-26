import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import { Calculator, Printer, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Quotation } from '../types';

export const QuotationPage: React.FC = () => {
  const { addQuotation, addBooking, setCurrentView, formatMoney, openMpesaModal } = useApp();

  const [clientName, setClientName] = useState('Dr. Dennis Mutua');
  const [clientEmail, setClientEmail] = useState('mutua@example.com');
  const [clientPhone, setClientPhone] = useState('+254 712 984 550');
  const [serviceName, setServiceName] = useState('Multi-Camera Livestreaming & 4K Recording');
  const [packageTier, setPackageTier] = useState<'Standard' | 'Premium' | 'Enterprise'>('Premium');

  const [basePrice, setBasePrice] = useState(85000);
  const [camerasCount, setCamerasCount] = useState(3);
  const [includeAudioDesk, setIncludeAudioDesk] = useState(true);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [travelKm, setTravelKm] = useState(0); // 0 = inside Nairobi
  const [includeVat, setIncludeVat] = useState(true);

  // Math breakdown
  const cameraAddonCost = (camerasCount - 1) * 20000;
  const audioDeskCost = includeAudioDesk ? 25000 : 0;
  const droneCost = includeDrone ? 35000 : 0;
  const travelCost = travelKm * 150; // KES 150/km return trip

  const subtotal = basePrice + cameraAddonCost + audioDeskCost + droneCost + travelCost;
  const vatAmount = includeVat ? Math.round(subtotal * 0.16) : 0;
  const total = subtotal + vatAmount;
  const depositRequired = Math.round(total * 0.5);

  const quoteNumber = `GMP-QT-${Math.floor(10000 + Math.random() * 90000)}`;

  const handleCreateBookingFromQuote = () => {
    const quote: Quotation = {
      id: `q-${Date.now()}`,
      quoteNumber,
      date: new Date().toISOString().split('T')[0],
      clientName,
      clientEmail,
      clientPhone,
      serviceName,
      packageName: packageTier,
      basePriceKES: basePrice,
      camerasCount,
      cameraAddonKES: cameraAddonCost,
      audioDeskAddonKES: audioDeskCost,
      droneCoverageKES: droneCost,
      travelDistanceKm: travelKm,
      travelCostKES: travelCost,
      taxVAT16Percent: vatAmount,
      subtotalKES: subtotal,
      totalKES: total,
      depositRequiredKES: depositRequired,
      status: 'Converted to Booking',
    };
    addQuotation(quote);

    const booking = addBooking({
      clientName,
      organization: 'Quotation Client',
      email: clientEmail,
      phone: clientPhone,
      whatsapp: clientPhone,
      serviceCategory: serviceName,
      eventType: `${packageTier} Production Scope`,
      eventDate: '2026-12-01',
      startTime: '08:00 AM',
      endTime: '06:00 PM',
      location: travelKm > 0 ? `${travelKm}km Outside Nairobi` : 'Nairobi Metro',
      estimatedBudgetKES: total,
      guestCount: 300,
      camerasRequired: camerasCount,
      livestreamPlatform: 'YouTube & Zoom Hybrid',
      specialRequirements: `Auto-generated from Quotation #${quoteNumber}`,
      totalCostKES: total,
    });

    // Offer immediate M-Pesa deposit
    openMpesaModal({
      amountKES: depositRequired,
      bookingRef: booking.referenceNumber,
      description: `50% Deposit for Quote ${quoteNumber}`,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Interactive Production Estimator
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Automated Quotation Generator
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Configure cameras, drone flights, sound consoles, and travel for an indicative estimate. Confirm the final scope and price with our team.
          </p>
        </div>

        {/* 2-Column Split: Controls on Left, Live Quotation Sheet on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#0d0d0d] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Configure Scope Parameters
            </h3>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Service & Tier */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Core Production Service
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => {
                    setServiceName(e.target.value);
                    if (e.target.value.includes('Livestreaming')) setBasePrice(85000);
                    else if (e.target.value.includes('Videography')) setBasePrice(95000);
                    else if (e.target.value.includes('Photography')) setBasePrice(65000);
                    else setBasePrice(140000);
                  }}
                  className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option>Multi-Camera Livestreaming & 4K Recording</option>
                  <option>Cinematic 4K/6K Videography & Documentary</option>
                  <option>High-Resolution Editorial Photography</option>
                  <option>Turnkey Stage, LED Wall & Sound Production</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Premium', 'Enterprise'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => {
                      setPackageTier(tier);
                      if (tier === 'Standard') setBasePrice(60000);
                      else if (tier === 'Premium') setBasePrice(95000);
                      else setBasePrice(175000);
                    }}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      packageTier === tier
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#141414] text-neutral-400 border-[#262626] hover:text-white'
                    }`}
                  >
                    {tier} Tier
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-neutral-300">Camera Angles / Operators:</span>
                <span className="font-bold text-[#D4AF37]">{camerasCount} Cameras</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={camerasCount}
                onChange={(e) => setCamerasCount(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <p className="text-[11px] text-neutral-500">
                1st camera included in base tier. +KES 20,000 per additional operator & body.
              </p>
            </div>

            {/* Add-on toggles */}
            <div className="space-y-3 pt-2 border-t border-[#1a1a1a]">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#252525] cursor-pointer hover:border-neutral-600 transition-colors">
                <div className="text-xs">
                  <p className="font-semibold text-white">Digital Audio Console & Multitrack</p>
                  <p className="text-neutral-400">Allen & Heath SQ-6 + Shure wireless mics</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#D4AF37] font-semibold">+KES 25,000</span>
                  <input
                    type="checkbox"
                    checked={includeAudioDesk}
                    onChange={(e) => setIncludeAudioDesk(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#252525] cursor-pointer hover:border-neutral-600 transition-colors">
                <div className="text-xs">
                  <p className="font-semibold text-white">DJI Aerial 4K Drone Cinematography</p>
                  <p className="text-neutral-400">Flown by KCAA-certified commercial pilot</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#D4AF37] font-semibold">+KES 35,000</span>
                  <input
                    type="checkbox"
                    checked={includeDrone}
                    onChange={(e) => setIncludeDrone(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
              </label>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#252525] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-semibold">Travel Outside Nairobi (km):</span>
                  <span className="text-[#D4AF37] font-bold">{travelKm} km</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={350}
                  step={25}
                  value={travelKm}
                  onChange={(e) => setTravelKm(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <p className="text-[11px] text-neutral-500">
                  {travelKm === 0
                    ? 'Within Nairobi Metro: Free Logistics'
                    : `Naivasha, Nakuru, Kisumu, Mombasa logistics (+KES ${travelCost.toLocaleString()})`}
                </p>
              </div>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#252525] cursor-pointer">
                <span className="text-xs text-neutral-300">Apply Standard 16% VAT Tax</span>
                <input
                  type="checkbox"
                  checked={includeVat}
                  onChange={(e) => setIncludeVat(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37]"
                />
              </label>
            </div>
          </div>

          {/* Right Column: Live Printable Quotation Sheet */}
          <div className="lg:col-span-6 bg-white text-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl font-sans">
            {/* Quote Sheet Header */}
            <div className="flex justify-between items-start border-b border-neutral-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#080808] text-[#D4AF37] font-extrabold flex items-center justify-center text-xs">
                    G
                  </span>
                  <span className="font-extrabold text-sm tracking-wider uppercase">
                    GURU MEDIA PRODUCTION
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">{COMPANY_INFO.location}</p>
                <p className="text-[11px] text-neutral-500">KRA PIN: P051948291X</p>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase font-extrabold text-neutral-400">Indicative Estimate</p>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-0.5">{quoteNumber}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Date: {new Date().toLocaleDateString()}
                </p>
                <p className="text-[11px] text-neutral-500">Valid For: 30 Days</p>
              </div>
            </div>

            {/* Recipient */}
            <div className="text-xs space-y-1">
              <p className="text-neutral-400 uppercase font-semibold">Prepared For:</p>
              <p className="font-bold text-neutral-900 text-sm">{clientName}</p>
              <p className="text-neutral-600">{clientEmail} · {clientPhone}</p>
            </div>

            {/* Line Items Table */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-neutral-100 border-b border-neutral-200 font-bold text-neutral-700">
                  <tr>
                    <th className="p-2.5">Scope Description</th>
                    <th className="p-2.5 text-right">Amount (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5">
                      <p className="font-semibold text-neutral-900">{serviceName}</p>
                      <p className="text-[11px] text-neutral-500">{packageTier} Base Tier Package</p>
                    </td>
                    <td className="p-2.5 text-right font-mono tabular-nums">
                      {basePrice.toLocaleString()}
                    </td>
                  </tr>

                  {cameraAddonCost > 0 && (
                    <tr>
                      <td className="p-2.5">
                        Additional Camera Operators ({camerasCount - 1} extra)
                      </td>
                      <td className="p-2.5 text-right font-mono tabular-nums">
                        {cameraAddonCost.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {includeAudioDesk && (
                    <tr>
                      <td className="p-2.5">Allen & Heath Audio Desk + Shure Digital Wireless</td>
                      <td className="p-2.5 text-right font-mono tabular-nums">
                        {audioDeskCost.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {includeDrone && (
                    <tr>
                      <td className="p-2.5">DJI Aerial 4K Drone Cinematography Flight</td>
                      <td className="p-2.5 text-right font-mono tabular-nums">
                        {droneCost.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {travelCost > 0 && (
                    <tr>
                      <td className="p-2.5">Regional Crew & Rig Logistics ({travelKm} km)</td>
                      <td className="p-2.5 text-right font-mono tabular-nums">
                        {travelCost.toLocaleString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-700 pt-2 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums font-semibold">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>

              {includeVat && (
                <div className="flex justify-between">
                  <span>VAT (16%):</span>
                  <span className="font-mono tabular-nums">KES {vatAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-300 pt-2">
                <span>Total Investment:</span>
                <span className="text-[#080808] font-mono tabular-nums">
                  KES {total.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg mt-2">
                <span>50% Required Deposit to Lock Date:</span>
                <span className="font-mono tabular-nums">KES {depositRequired.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 border border-neutral-300 hover:bg-neutral-100 rounded-xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>

              <button
                onClick={handleCreateBookingFromQuote}
                className="w-full sm:flex-1 py-2.5 px-4 bg-[#080808] hover:bg-[#202020] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow"
              >
                <span>Accept Quote & Pay Deposit</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
