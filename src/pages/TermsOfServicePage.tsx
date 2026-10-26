import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/mockData';
import { Download, ChevronDown, ChevronUp, Printer, Mail, FileCheck } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(1);

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  const terms = [
    {
      num: 1,
      title: '1. Acceptance of Terms',
      content:
        'By accessing our website, booking our production services, or using our client portal, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please do not use our services or website.',
    },
    {
      num: 2,
      title: '2. Services',
      content:
        'Guru Creations Media offers digital media, cinematic videography, aerial drone cinematography, photography, multi-camera broadcasting, sound engineering, and web development solutions. Production specifications, crew schedules, and deliverable timelines are confirmed upon formal quotation and booking deposit.',
    },
    {
      num: 3,
      title: '3. User Responsibilities',
      content:
        'You agree not to use our services, uploaded media, or digital portals for any unlawful, abusive, or infringing purposes. You confirm you possess the necessary rights and venue permissions for footage recorded at your requested events.',
    },
    {
      num: 4,
      title: '4. Intellectual Property',
      content:
        'All original media content, video assets, graphics, and codebase created by Guru Creations Media remain the intellectual property of Guru Creations Ltd until final contract completion and balance settlement, upon which full commercial and personal usage rights are transferred to the client.',
    },
    {
      num: 5,
      title: '5. Limitation of Liability',
      content:
        'While we deploy professional dual-slot redundancy, bonded multi-network cellular streaming, and battery backups, Guru Creations Media is not liable for force majeure venue power grid collapses or sudden acts of nature beyond reasonable commercial control. All equipment is deployed under rigorous safety standards.',
    },
    {
      num: 6,
      title: '6. Third-Party Links',
      content:
        'Our website may contain links to third-party platforms (e.g. YouTube, social media networks, external client sites). We do not control and are not responsible for the privacy practices or contents of those external services.',
    },
    {
      num: 7,
      title: '7. Changes to Terms',
      content:
        'We reserve the right to revise or update these Terms of Service at any time. Any changes take effect immediately upon posting to this page. Continued engagement with our services indicates acceptance of the updated terms.',
    },
    {
      num: 8,
      title: '8. Contact Us & Inquiries',
      content:
        `For legal inquiries, contract reviews, or formal production agreements, please email us directly at ${COMPANY_INFO.email} or call ${COMPANY_INFO.phone}.`,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0f0f1a] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto font-light">
            Please read these terms carefully before engaging our media production, broadcasting, or digital services.
          </p>

          <div className="pt-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Terms as PDF / Print</span>
            </button>
          </div>
        </div>

        {/* 8 Accordion Sections */}
        <div className="space-y-4">
          {terms.map((item) => (
            <div
              key={item.num}
              className="bg-[#141424] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-colors"
            >
              <button
                onClick={() => toggleSection(item.num)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-white hover:text-[#ff7b00] transition-colors cursor-pointer"
              >
                <span>{item.title}</span>
                {openSection === item.num ? (
                  <ChevronUp className="w-5 h-5 text-[#ff7b00]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
              </button>
              <div
                className={`px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4 ${
                  openSection === item.num ? '' : 'hidden print:block'
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Download Card */}
        <div className="p-6 bg-[#141424] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Need a Signed Corporate Master Services Agreement?</p>
            <p className="text-xs text-neutral-400">
              We provide formal non-disclosure agreements (NDAs) and corporate contracts for government and enterprise clients.
            </p>
          </div>

          <a
            href={`mailto:${COMPANY_INFO.email}?subject=Corporate%20MSA%20Inquiry`}
            className="px-4 py-2 border border-white/20 hover:border-white text-xs font-bold text-white rounded-xl transition-colors whitespace-nowrap cursor-pointer"
          >
            Request MSA Agreement
          </a>
        </div>
      </div>
    </div>
  );
};
