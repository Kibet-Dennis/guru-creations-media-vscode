import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, Users, Video, Camera, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Booking } from '../types';

export const BookingPage: React.FC = () => {
  const { addBooking, setCurrentView, openMpesaModal, formatMoney } = useApp();

  const [formData, setFormData] = useState({
    clientName: '',
    organization: '',
    email: '',
    phone: '',
    whatsapp: '',
    serviceCategory: 'Cinematic Videography & Photography',
    eventType: 'Corporate Summit / Conference',
    eventDate: '2026-11-28',
    startTime: '08:30 AM',
    endTime: '05:30 PM',
    location: 'Nairobi (KICC / Westlands)',
    estimatedBudgetKES: 120000,
    guestCount: 250,
    camerasRequired: 3,
    livestreamPlatform: 'YouTube & Zoom Hybrid',
    specialRequirements: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email || !formData.phone) return;

    const created = addBooking({
      ...formData,
      totalCostKES: formData.estimatedBudgetKES,
    });
    setSubmittedBooking(created);
  };

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Reserve Production Crew & Broadcast Rig
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book Our Media Production Services
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Fill in your production details below. Our production coordinator will review your schedule and assign technical leads within 2 hours.
          </p>
        </div>

        {submittedBooking ? (
          /* Confirmation Card */
          <div className="bg-[#0e0e0e] border border-[#D4AF37]/50 rounded-2xl p-8 sm:p-10 space-y-6 shadow-2xl gold-border-glow animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Booking Request Received!</h2>
              <p className="text-sm text-neutral-300">
                Your reservation has been logged into our technical production queue.
              </p>
            </div>

            <div className="p-4 bg-[#141414] border border-[#222] rounded-xl max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-[#242424] pb-2">
                <span className="text-neutral-400">Reference Number:</span>
                <span className="text-[#D4AF37] font-bold text-sm">
                  {submittedBooking.referenceNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Client Name:</span>
                <span className="text-white">{submittedBooking.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Event Date:</span>
                <span className="text-white">{submittedBooking.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Service:</span>
                <span className="text-white">{submittedBooking.serviceCategory}</span>
              </div>
              <div className="flex justify-between border-t border-[#242424] pt-2">
                <span className="text-neutral-400">Status:</span>
                <span className="text-amber-400 font-semibold">{submittedBooking.status}</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() =>
                  openMpesaModal({
                    amountKES: Math.round(submittedBooking.totalCostKES * 0.5),
                    bookingRef: submittedBooking.referenceNumber,
                    description: `50% Deposit for ${submittedBooking.eventType}`,
                  })
                }
                className="w-full sm:w-auto px-6 py-3 bg-[#00A859] hover:bg-[#00924d] text-white font-semibold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Pay 50% Deposit via M-Pesa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('client-portal')}
                className="w-full sm:w-auto px-6 py-3 bg-[#181818] hover:bg-[#222] text-neutral-200 border border-[#333] hover:border-white font-medium text-xs rounded-xl transition-all cursor-pointer"
              >
                Go to Client Portal
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Section Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl"
          >
            {/* 1. Client & Organization Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <span>01. Contact & Organizer Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Dennis Mwangi"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Grace International / Nairobi Tech"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dennis@example.com"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })
                    }
                    placeholder="e.g. +254 712 345 678"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Event Specifics */}
            <div className="space-y-4 pt-4 border-t border-[#1a1a1a]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                02. Event Timing & Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Radisson Blu Upper Hill, Safari Park, or Naivasha"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* 3. Technical Requirements */}
            <div className="space-y-4 pt-4 border-t border-[#1a1a1a]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                03. Technical Production Scope
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Primary Service Category
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Cinematic Videography & Photography</option>
                    <option>Multi-Camera 4K Livestreaming & Broadcast</option>
                    <option>Professional Editorial Photography Only</option>
                    <option>Sound Engineering & Live Audio Reinforcement</option>
                    <option>Turnkey Event Production (Sound + Video + Lights)</option>
                    <option>Digital Media & Motion Graphics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Corporate Summit / Conference</option>
                    <option>Luxury Wedding Celebration</option>
                    <option>Church Mega Conference / Worship</option>
                    <option>Live Music Concert / Festival</option>
                    <option>Documentary / Commercial Shoot</option>
                    <option>Graduation / Birthday Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Number of Cameras Needed
                  </label>
                  <select
                    value={formData.camerasRequired}
                    onChange={(e) =>
                      setFormData({ ...formData, camerasRequired: Number(e.target.value) })
                    }
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1}>1 Camera (Essential)</option>
                    <option value={2}>2 Cameras (Standard Multi-Angle)</option>
                    <option value={3}>3 Cameras (Director Switched + Roaming)</option>
                    <option value={4}>4 Cameras (Broadcast Suite + Jib)</option>
                    <option value={6}>6+ Cameras (Arena / Stadium Setup)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Livestream Destination Platform
                  </label>
                  <select
                    value={formData.livestreamPlatform}
                    onChange={(e) =>
                      setFormData({ ...formData, livestreamPlatform: e.target.value })
                    }
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>YouTube & Zoom Hybrid</option>
                    <option>YouTube Live Stream Only</option>
                    <option>Facebook Live Only</option>
                    <option>Multi-Destination (YouTube + FB + LinkedIn)</option>
                    <option>Private Password Diaspora Link</option>
                    <option>No Livestreaming (Recording Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Estimated Budget Target (KES)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={40000}
                    max={500000}
                    step={10000}
                    value={formData.estimatedBudgetKES}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedBudgetKES: Number(e.target.value) })
                    }
                    className="flex-1 accent-[#D4AF37]"
                  />
                  <span className="font-mono text-sm font-bold text-[#D4AF37] w-36 text-right tabular-nums">
                    {formatMoney(formData.estimatedBudgetKES)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Special Instructions / Deliverable Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={(e) =>
                    setFormData({ ...formData, specialRequirements: e.target.value })
                  }
                  placeholder="e.g. Drone flight permissions required, 2-day delivery needed, simultaneous French translation audio..."
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Zero obligations. Official quote issued upon submission.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Production Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
