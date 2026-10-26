import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, FAQS } from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setSuccessNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Production Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccessNotification('Message transmitted to our Nairobi studio coordinator.');
  };

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Nairobi Studio Headquarters
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Connect With Guru Media Production
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Visit our broadcast suite in Westlands or speak directly with our production coordinators for immediate event bookings across East Africa.
          </p>
        </div>

        {/* 2-Column: Contacts & Map on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact & Studio Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Physical Studio Address</p>
                    <p className="text-neutral-400 leading-relaxed">{COMPANY_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Direct Calls & Hotline</p>
                    <p className="text-neutral-300 font-mono">{COMPANY_INFO.phone}</p>
                    <p className="text-neutral-400 font-mono">{COMPANY_INFO.phoneSecondary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Inquiries & Proposals</p>
                    <p className="text-neutral-300">{COMPANY_INFO.email}</p>
                    <p className="text-neutral-400">{COMPANY_INFO.bookingsEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Studio & Production Hours</p>
                    <p className="text-neutral-400">{COMPANY_INFO.hours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Guru%20Media%20Production,%20I%20would%20like%20to%20inquire%20about%20a%20production.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Financial & Banking Information Card */}
            <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 space-y-4 text-xs font-mono">
              <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider font-sans flex items-center gap-2">
                <Building className="w-3.5 h-3.5" />
                Verified Payment Accounts (Kenya)
              </h4>

              <div className="p-3 bg-[#141414] rounded-xl border border-[#252525] space-y-1">
                <p className="text-neutral-400">Safaricom M-Pesa Paybill:</p>
                <p className="text-emerald-400 font-bold text-sm">
                  {COMPANY_INFO.mpesaPaybill}
                </p>
                <p className="text-neutral-500 text-[11px]">
                  Account: <span className="text-white font-semibold">Your Booking Ref #</span>
                </p>
              </div>

              <div className="p-3 bg-[#141414] rounded-xl border border-[#252525] space-y-1">
                <p className="text-neutral-400">Direct Bank Wire (EFT / RTGS):</p>
                <p className="text-white font-bold">{COMPANY_INFO.bankName}</p>
                <p className="text-neutral-300">A/C: {COMPANY_INFO.bankAccount}</p>
                <p className="text-neutral-500 text-[11px]">SWIFT Code: {COMPANY_INFO.bankSwift}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white">Send Us An Inquiry</h3>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#141414] rounded-xl border border-[#292929]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Thank you, {formData.name}. Our production coordinator will review your request and reply to {formData.email} within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-[#333] hover:border-white text-xs text-neutral-200 rounded-xl cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dennis Mutua"
                      className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
                      className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 712 345 678"
                      className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#141414] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>General Production Inquiry</option>
                      <option>Livestreaming Broadcast Quote</option>
                      <option>Wedding Videography & Photography</option>
                      <option>Corporate Summit / Hybrid Event</option>
                      <option>Church Sound & Broadcast Consultation</option>
                      <option>Equipment Hire Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Message / Event Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the dates, venue, expected audience, and technical scope..."
                    className="w-full bg-[#141414] border border-[#282828] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Guru Media</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-8 space-y-6 border-t border-[#181818]">
          <h2 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0e0e0e] border border-[#1f1f1f] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-[#1a1a1a] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
