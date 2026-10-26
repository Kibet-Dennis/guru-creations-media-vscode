import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const ConsultationSection: React.FC = () => {
  const { setSuccessNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [consultationWhatsAppUrl, setConsultationWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setConsultationWhatsAppUrl(
      getWhatsAppUrl([
        'Consultation request',
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Organization: ${formData.company || 'Not provided'}`,
        `Project brief: ${formData.message}`,
      ].join('\n'))
    );
    setSubmitted(true);
    setSuccessNotification(
      'Your consultation request is ready. Open WhatsApp and tap Send to deliver it.'
    );
  };

  return (
    <section id="free-consultation" className="relative w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_0_35px_rgba(0,255,255,0.2)] space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get a Consultation
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light">
            Let’s discuss how we can elevate your brand’s digital presence.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3 bg-white/5 rounded-2xl border border-white/10">
            <CheckCircle2 className="w-12 h-12 text-[#ff7b00] mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Your Request Is Ready</h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto">
              It has not been sent yet. Open WhatsApp below and tap Send to deliver your request.
            </p>
            <a
              href={consultationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-3 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Send Consultation via WhatsApp
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', company: '', message: '' });
              }}
              className="mt-2 text-xs text-[#ff7b00] underline cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name *"
                className="w-full bg-white/[0.08] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address *"
                className="w-full bg-white/[0.08] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-all"
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company / Organization Name"
                className="w-full bg-white/[0.08] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-all"
              />
            </div>

            <div>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project, goals, and timeline *"
                className="w-full bg-white/[0.08] border border-white/15 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#ff7b00] hover:bg-[#00ffff] hover:text-black text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Request for Consultation</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
