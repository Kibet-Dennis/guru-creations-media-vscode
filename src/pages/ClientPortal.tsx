import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectStage } from '../types';
import {
  User,
  Calendar,
  FileText,
  Download,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  Sparkles,
  CreditCard,
  Smartphone,
} from 'lucide-react';

const ALL_STAGES: ProjectStage[] = [
  'Consultation',
  'Planning',
  'Pre-production',
  'Production',
  'Editing',
  'Client Review',
  'Revisions',
  'Approved',
  'Delivered',
];

export const ClientPortal: React.FC = () => {
  const {
    projects,
    bookings,
    invoices,
    currentClientEmail,
    setCurrentClientEmail,
    addProjectMessage,
    openMpesaModal,
    formatMoney,
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState<'timeline' | 'deliverables' | 'invoices' | 'messages'>(
    'timeline'
  );

  // Filter client's records
  const myProjects = projects.filter((p) => p.clientEmail === currentClientEmail);
  const myBookings = bookings.filter((b) => b.email === currentClientEmail);
  const myInvoices = invoices.filter((inv) =>
    myBookings.some((b) => b.referenceNumber === inv.bookingRef)
  );

  const activeProject = myProjects[0] || projects[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeProject) return;
    addProjectMessage(activeProject.id, messageInput, true);
    setMessageInput('');
  };

  const getStageIndex = (stage: ProjectStage) => ALL_STAGES.indexOf(stage);
  const currentStageIndex = activeProject ? getStageIndex(activeProject.currentStage) : 0;

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Portal Header & Account Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1c1c1c] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
              <User className="w-3.5 h-3.5" />
              <span>Guru Client Production Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {activeProject ? activeProject.projectName : 'Client Media Hub'}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Active Client: <span className="text-neutral-200 font-semibold">{currentClientEmail}</span>
            </p>
          </div>

          {/* Quick Client Switcher for Evaluation */}
          <div className="flex items-center gap-3 bg-[#121212] border border-[#222] p-2 rounded-xl text-xs">
            <span className="text-neutral-400 font-medium">Switch Profile:</span>
            <select
              value={currentClientEmail}
              onChange={(e) => setCurrentClientEmail(e.target.value)}
              className="bg-[#1a1a1a] border border-[#333] text-white px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="david@africatech.co.ke">David Kimani (Africa Tech Ventures)</option>
              <option value="cynthia.mutua@gmail.com">Cynthia & Brian Mutua (Wedding)</option>
              <option value="media@nairobiworship.org">Pastor Samuel (Worship Centre)</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Production Timeline & Status
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'deliverables'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Media Deliverables ({activeProject?.deliverables.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Invoices & M-Pesa ({myInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Crew Chat ({activeProject?.messages.length || 0})
          </button>
        </div>

        {/* TAB 1: 9-Stage Timeline */}
        {activeTab === 'timeline' && activeProject && (
          <div className="space-y-8">
            <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-neutral-400 font-mono">
                    Booking Ref: {activeProject.bookingRef}
                  </p>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Stage: <span className="text-[#D4AF37]">{activeProject.currentStage}</span>
                  </h3>
                </div>

                <div className="text-xs text-neutral-400 space-y-1 sm:text-right">
                  <p>Assigned Lead: <span className="text-white font-medium">{activeProject.teamLead}</span></p>
                  <p>Final Target Delivery: <span className="text-[#D4AF37] font-semibold">{activeProject.deliveryDeadline}</span></p>
                </div>
              </div>

              {/* 9-Stage Stepper Bar */}
              <div className="pt-6 pb-2 overflow-x-auto">
                <div className="min-w-[750px] flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#222] -translate-y-1/2 z-0" />
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500"
                    style={{
                      width: `${(currentStageIndex / (ALL_STAGES.length - 1)) * 100}%`,
                    }}
                  />

                  {ALL_STAGES.map((stg, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div key={stg} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCurrent
                              ? 'bg-[#D4AF37] text-black ring-4 ring-[#D4AF37]/20 scale-110'
                              : isPassed
                              ? 'bg-[#AA820A] text-white'
                              : 'bg-[#181818] border border-[#333] text-neutral-500'
                          }`}
                        >
                          {isPassed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] font-medium mt-2 whitespace-nowrap ${
                            isCurrent
                              ? 'text-[#D4AF37] font-bold'
                              : isPassed
                              ? 'text-neutral-300'
                              : 'text-neutral-600'
                          }`}
                        >
                          {stg}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
                <p className="text-xs text-neutral-400 font-semibold uppercase">Project Milestones</p>
                <p className="text-sm text-neutral-200">
                  Pre-production script approved. Crew schedule dispatched.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
                <p className="text-xs text-neutral-400 font-semibold uppercase">Revision Policy</p>
                <p className="text-sm text-neutral-200">
                  Includes 2 rounds of minor client revisions free of charge within 14 days.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
                <p className="text-xs text-neutral-400 font-semibold uppercase">Cloud Retention</p>
                <p className="text-sm text-neutral-200">
                  All 4K video masters & raw footage preserved on encrypted cloud for 12 months.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Media Deliverables */}
        {activeTab === 'deliverables' && activeProject && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Ready Deliverables & Assets
            </h3>

            {activeProject.deliverables.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center">
                Deliverables are currently in production and will appear here for one-click download.
              </p>
            ) : (
              <div className="space-y-3">
                {activeProject.deliverables.map((del) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{del.title}</p>
                      <p className="text-xs text-neutral-400">
                        Size: <span className="font-mono text-neutral-300">{del.size}</span> · Format: {del.type}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Downloading ${del.title}...`)}
                      className="px-4 py-2 bg-[#1b1b1b] hover:bg-[#D4AF37] text-neutral-200 hover:text-black border border-[#333] hover:border-[#D4AF37] rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Invoices & M-Pesa */}
        {activeTab === 'invoices' && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#D4AF37]" />
              Billing, Invoices & M-Pesa Receipts
            </h3>

            <div className="space-y-4">
              {myInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{inv.invoiceNumber}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Booking Ref: <span className="font-mono text-neutral-300">{inv.bookingRef}</span> · Due: {inv.dueDate}
                    </p>
                    {inv.mpesaReceiptNumber && (
                      <p className="text-xs text-[#00A859] font-mono">
                        M-Pesa Receipt: {inv.mpesaReceiptNumber}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Total Invoiced</p>
                      <p className="text-base font-bold text-white tabular-nums">
                        {formatMoney(inv.amountKES)}
                      </p>
                    </div>

                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() =>
                          openMpesaModal({
                            invoiceId: inv.id,
                            amountKES: inv.amountKES - inv.amountPaidKES,
                            bookingRef: inv.bookingRef,
                            description: `Payment for Invoice ${inv.invoiceNumber}`,
                          })
                        }
                        className="px-4 py-2 bg-[#00A859] hover:bg-[#00924d] text-white text-xs font-bold rounded-xl transition-all shadow flex items-center gap-1.5 cursor-pointer"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Pay via M-Pesa</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Project Chat */}
        {activeTab === 'messages' && activeProject && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              Direct Communication with Production Lead
            </h3>

            {/* Chat History */}
            <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-[#121212] rounded-xl border border-[#222]">
              {activeProject.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.isClient ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.isClient
                        ? 'bg-[#D4AF37] text-black font-medium rounded-tr-none'
                        : 'bg-[#1e1e1e] text-neutral-200 border border-[#2d2d2d] rounded-tl-none'
                    }`}
                  >
                    <p className="font-bold text-[11px] opacity-80">{msg.sender}</p>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1 px-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Send Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message, question, or revision notes..."
                className="flex-1 bg-[#141414] border border-[#282828] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
