import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingStatus, ProjectStage } from '../types';
import {
  Shield,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  FileText,
  Users,
  CreditCard,
  Edit,
  ArrowRight,
  Eye,
  Lock,
  ShoppingBag,
  Download,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    projects,
    updateProjectStage,
    invoices,
    markInvoicePaid,
    storeOrders,
    formatMoney,
  } = useApp();

  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'projects' | 'invoices' | 'store-orders'>('store-orders');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/session')
      .then((response) => {
        if (cancelled) return;
        setIsAdminLoggedIn(response.ok);
        setIsCheckingSession(false);
      })
      .catch(() => {
        if (cancelled) return;
        setAuthError('Cannot reach the local authentication server.');
        setIsCheckingSession(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Stats calculation
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const activeProjectsCount = projects.length;
  const totalProductionRevenueKES = invoices.reduce((sum, inv) => sum + inv.amountPaidKES, 0);
  const totalStoreRevenueKES = storeOrders.reduce((sum, ord) => sum + ord.totalKES, 0);
  const grandTotalRevenueKES = totalProductionRevenueKES + totalStoreRevenueKES;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPin }),
      });
      if (!response.ok) {
        setAuthError(response.status === 429
          ? 'Too many attempts. Wait 15 minutes and try again.'
          : 'Incorrect admin password.');
        return;
      }
      setAdminPin('');
      setIsAdminLoggedIn(true);
    } catch {
      setAuthError('Cannot reach the local authentication server.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (!response.ok) {
        setAuthError('Unable to log out. Please try again.');
        return;
      }
      setIsAdminLoggedIn(false);
    } catch {
      setAuthError('Cannot reach the local authentication server.');
    }
  };

  if (isCheckingSession) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#080808] text-sm text-neutral-400">
        Checking admin session…
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#080808] px-4">
        <div className="w-full max-w-md bg-[#0e0e0e] border border-[#222] rounded-2xl p-8 space-y-6 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Guru Media Admin Console</h2>
            <p className="text-xs text-neutral-400">
              Restricted management panel for executive crew & logistics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
                minLength={16}
                className="w-full bg-[#161616] border border-[#2e2e2e] rounded-xl px-4 py-3 text-sm text-center tracking-widest text-white focus:outline-none focus:border-[#D4AF37]"
              />
              {authError && <p role="alert" className="text-xs text-red-400 mt-3">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Authenticate & Open Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C7018] text-black font-extrabold flex items-center justify-center text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">Executive Admin Center</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Nairobi Operations & Broadcast Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#2b2b2b] text-neutral-400 hover:text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Total Bookings</span>
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-extrabold text-white tabular-nums">{totalBookings}</p>
            <p className="text-[11px] text-neutral-400">Across all 47 counties</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Active & Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400 tabular-nums">
              {confirmedBookings}
            </p>
            <p className="text-[11px] text-neutral-400">Scheduled on crew calendar</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Store & Digital Assets</span>
              <ShoppingBag className="w-4 h-4 text-[#ff7b00]" />
            </div>
            <p className="text-3xl font-extrabold text-[#ff7b00] tabular-nums">
              {formatMoney(totalStoreRevenueKES)}
            </p>
            <p className="text-[11px] text-neutral-400">{storeOrders.length} automated transactions</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Total Gross Inflows</span>
              <CreditCard className="w-4 h-4 text-[#00A859]" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tabular-nums">
              {formatMoney(grandTotalRevenueKES)}
            </p>
            <p className="text-[11px] text-neutral-400">Production + Store + Gear Hire</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('store-orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'store-orders'
                ? 'bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store Orders & Revenue ({storeOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Booking Requests ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Production Stage Flow ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Invoices & Ledger ({invoices.length})
          </button>
        </div>

        {/* TAB 1: Booking Management */}
        {activeTab === 'bookings' && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-[#1c1c1c] flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Client Booking Pipeline
              </h3>
              <span className="text-xs text-neutral-400">
                Click status dropdown to update state immediately
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121212] text-neutral-400 font-semibold uppercase tracking-wider border-b border-[#1c1c1c]">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Client / Event</th>
                    <th className="p-4">Date & Venue</th>
                    <th className="p-4">Cameras</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1c]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#141414] transition-colors">
                      <td className="p-4 font-mono font-bold text-[#D4AF37]">{b.referenceNumber}</td>
                      <td className="p-4">
                        <p className="font-semibold text-white">{b.clientName}</p>
                        <p className="text-[11px] text-neutral-400">{b.eventType}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-neutral-200">{b.eventDate}</p>
                        <p className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                          {b.location}
                        </p>
                      </td>
                      <td className="p-4 text-neutral-300 font-mono">{b.camerasRequired} Cams</td>
                      <td className="p-4 font-mono font-semibold text-white tabular-nums">
                        {formatMoney(b.totalCostKES)}
                      </td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateBookingStatus(b.id, e.target.value as BookingStatus)
                          }
                          className="bg-[#1a1a1a] border border-[#333] text-neutral-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option>Pending</option>
                          <option>Under Review</option>
                          <option>Quotation Sent</option>
                          <option>Awaiting Deposit</option>
                          <option>Confirmed</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="px-2.5 py-1 bg-red-600/30 hover:bg-red-600 text-red-200 rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Production Stage Progression */}
        {activeTab === 'projects' && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Active Project Stage Progression
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-xl bg-[#141414] border border-[#252525] space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                        {proj.bookingRef}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{proj.projectName}</h4>
                      <p className="text-xs text-neutral-400">Client: {proj.clientName}</p>
                    </div>

                    <span className="bg-[#222] text-[#D4AF37] px-2.5 py-1 rounded text-xs font-semibold">
                      {proj.currentStage}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#1e1e1e]">
                    <label className="text-xs font-medium text-neutral-400">
                      Advance Production Stage:
                    </label>
                    <select
                      value={proj.currentStage}
                      onChange={(e) =>
                        updateProjectStage(proj.id, e.target.value as ProjectStage)
                      }
                      className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Consultation</option>
                      <option>Planning</option>
                      <option>Pre-production</option>
                      <option>Production</option>
                      <option>Editing</option>
                      <option>Client Review</option>
                      <option>Revisions</option>
                      <option>Approved</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Invoice Ledger */}
        {activeTab === 'invoices' && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Financial Invoices & Payment Verification
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121212] text-neutral-400 font-semibold uppercase tracking-wider border-b border-[#1c1c1c]">
                  <tr>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">M-Pesa Code</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1c]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#141414]">
                      <td className="p-4 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                      <td className="p-4 text-neutral-200">{inv.clientName}</td>
                      <td className="p-4 text-neutral-400">{inv.dueDate}</td>
                      <td className="p-4 font-mono font-bold text-white tabular-nums">
                        {formatMoney(inv.amountKES)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[#00A859]">
                        {inv.mpesaReceiptNumber || '—'}
                      </td>
                      <td className="p-4 text-right">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => {
                              const code = prompt('Enter the verified Safaricom M-Pesa receipt code:');
                              if (code) markInvoicePaid(inv.id, code, 'M-Pesa');
                            }}
                            className="px-3 py-1.5 bg-[#00A859] hover:bg-[#00924d] text-white rounded text-xs font-semibold cursor-pointer"
                          >
                            Confirm Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Store Orders & E-Commerce */}
        {activeTab === 'store-orders' && (
          <div className="bg-[#0e0e0e] border border-[#202020] rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#ff7b00]" />
                  <span>Store Orders & Digital Asset Sales</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Automated sales of LUT packs, presets, Guru Wear, gear rentals, and workshop tickets.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">Total Store Revenue:</span>
                <span className="font-mono text-base font-bold text-[#ff7b00]">
                  {formatMoney(totalStoreRevenueKES)}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121212] text-neutral-400 font-semibold uppercase tracking-wider border-b border-[#1c1c1c]">
                  <tr>
                    <th className="p-4">Order Ref</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Purchased Items</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">M-Pesa Code</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Digital Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1c]">
                  {storeOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#141414]">
                      <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                        {ord.orderNumber}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-white">{ord.customerName}</p>
                        <p className="text-[11px] text-neutral-400">{ord.customerEmail}</p>
                        <p className="text-[11px] text-neutral-500 font-mono">{ord.customerPhone}</p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <p key={idx} className="text-neutral-200">
                              <span className="text-[#ff7b00] font-mono">{it.quantity}x</span> {it.product.title}
                              {it.selectedOption && (
                                <span className="text-neutral-400 text-[10px] ml-1">({it.selectedOption})</span>
                              )}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-white tabular-nums whitespace-nowrap">
                        {formatMoney(ord.totalKES)}
                      </td>
                      <td className="p-4 text-neutral-300 whitespace-nowrap">
                        {ord.paymentMethod}
                      </td>
                      <td className="p-4 font-mono text-[#00A859] whitespace-nowrap">
                        {ord.mpesaReceiptCode || '—'}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            ord.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {ord.downloadAccessGranted ? (
                          <span className="text-emerald-400 flex items-center justify-end gap-1 font-mono text-[11px]">
                            <Download className="w-3.5 h-3.5" />
                            <span>Granted</span>
                          </span>
                        ) : (
                          <span className="text-neutral-500 text-[11px]">Physical Delivery</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
