import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import {
  ShieldCheck,
  UserCheck,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Check,
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setSuccessNotification } = useApp();
  const [openSection, setOpenSection] = useState<number | null>(1);
  const [cookieConsent, setCookieConsent] = useState(true);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-[#0f0f1a] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase">
            DATA RESPONSIBILITY
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy & Policy
          </h1>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto font-light">
            Your data. Our responsibility. Learn how Guru Creations Media collects, uses, and protects your information.
          </p>
          <p className="text-xs text-neutral-500 font-mono">
            Last Updated: October 2026 · Guru Creations Media
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Section 1 */}
          <div className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection(1)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
            >
              <span>1. Introduction and Scope of this Policy</span>
              {openSection === 1 ? (
                <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSection === 1 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4">
                This policy applies to all users of Guru Creations Media's website, media platforms, and digital production services. By accessing our services, submitting booking requests, or using our client portal, you agree to the collection and handling of information as outlined in this policy.
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection(2)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
            >
              <span>2. Information We Collect and Why</span>
              {openSection === 2 ? (
                <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSection === 2 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 space-y-4">
                <div>
                  <h5 className="font-bold text-[#ff7b00] flex items-center gap-1.5 mb-1">
                    <UserCheck className="w-4 h-4" /> Personal Information
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400">
                    <li>Name, Email Address, and Phone Number (collected via booking and inquiry forms).</li>
                    <li>Production briefs, event locations, schedules, and custom project notes.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-[#ff7b00] flex items-center gap-1.5 mb-1">
                    <Globe className="w-4 h-4" /> Non-Personal & Usage Data
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400">
                    <li>IP address, browser type, operating system, and anonymous analytics.</li>
                    <li>Functional cookies to remember currency preferences and client portal states.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection(3)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
            >
              <span>3. How We Use Your Information & Legal Basis</span>
              {openSection === 3 ? (
                <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSection === 3 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 space-y-2">
                <p className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>To respond to production inquiries and issue quotations:</span>
                  <span className="bg-neutral-800 text-neutral-300 text-[11px] px-2 py-0.5 rounded">
                    Legitimate Interest
                  </span>
                </p>
                <p className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>Production coordination & deliverable transfers:</span>
                  <span className="bg-neutral-800 text-[#ff7b00] text-[11px] px-2 py-0.5 rounded">
                    Contractual Necessity
                  </span>
                </p>
                <p className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>Analytics & website performance optimization:</span>
                  <span className="bg-neutral-800 text-amber-400 text-[11px] px-2 py-0.5 rounded">
                    Legitimate Interest
                  </span>
                </p>
                <p className="flex items-center justify-between py-1">
                  <span>Statutory tax invoices (KRA compliant records):</span>
                  <span className="bg-neutral-800 text-red-400 text-[11px] px-2 py-0.5 rounded">
                    Legal Obligation
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection(4)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
            >
              <span>4. Data Sharing, Security, and Retention</span>
              {openSection === 4 ? (
                <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSection === 4 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 space-y-3">
                <p>
                  <strong>We never sell your personal data.</strong> Information is shared solely with trusted payment processors (Safaricom M-Pesa, authorized banking networks) and cloud deliverable hosting providers necessary to complete your production.
                </p>
                <p>
                  We deploy industry-standard encryption, role-based access control, and SSL transmission protocols. High-resolution raw and edited media files are preserved securely in encrypted archives for 12 months post-delivery.
                </p>
              </div>
            )}
          </div>

          {/* Section 5 */}
          <div className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection(5)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
            >
              <span>5. Your Rights & Cookie Policy</span>
              {openSection === 5 ? (
                <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSection === 5 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 space-y-4">
                <p>
                  You have the right to request access to the personal data we hold about you, request corrections, or request deletion of account details upon contract completion.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setCookieConsent(!cookieConsent);
                      setSuccessNotification(
                        cookieConsent
                          ? 'Optional cookies declined.'
                          : 'Cookie preferences updated and saved.'
                      );
                    }}
                    className="px-4 py-2 bg-[#ff7b00]/20 text-[#ff7b00] border border-[#ff7b00]/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {cookieConsent ? 'Manage Preferences (Active)' : 'Enable All Cookies'}
                  </button>

                  <button
                    onClick={() => setSuccessNotification('You have opted out of promotional communications.')}
                    className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Opt-Out of Marketing Emails
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
