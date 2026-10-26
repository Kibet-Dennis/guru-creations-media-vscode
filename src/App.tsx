import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomeLiveTeaser } from './components/HomeLiveTeaser';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsCounterSection } from './components/StatsCounterSection';
import { LiveProjectsSection } from './components/LiveProjectsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { YouTubeChannelSection } from './components/YouTubeChannelSection';
import { HomeRevenueTeaser } from './components/HomeRevenueTeaser';
import { ProductionProcess } from './components/ProductionProcess';
import { ConsultationSection } from './components/ConsultationSection';
import { TeamSection } from './components/TeamSection';
import { HomeBlogTeaser } from './components/HomeBlogTeaser';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CookieBanner } from './components/CookieBanner';
import { ShowreelModal } from './components/ShowreelModal';
import { MpesaModal } from './components/MpesaModal';

// Dedicated Pages
import { WhoWeArePage } from './pages/WhoWeArePage';
import { JournalBlogPage } from './pages/JournalBlogPage';
import { LiveEventsPage } from './pages/LiveEventsPage';
import { PricingPage } from './pages/PricingPage';
import { BookingPage } from './pages/BookingPage';
import { QuotationPage } from './pages/QuotationPage';
import { ClientPortal } from './pages/ClientPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { EquipmentPage } from './pages/EquipmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ContactPage } from './pages/ContactPage';

import { TESTIMONIALS } from './data/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    successNotification,
    setSuccessNotification,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-[#ff7b00] selection:text-black">
      {/* Toast Notification Banner */}
      {successNotification && (
        <div className="fixed top-16 right-4 z-50 max-w-md bg-[#121216] border border-[#ff7b00] text-white p-4 rounded-xl shadow-2xl flex items-start gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-[#ff7b00] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <p className="font-semibold text-white">Update</p>
            <p className="text-neutral-300 mt-0.5">{successNotification}</p>
          </div>
          <button
            onClick={() => setSuccessNotification(null)}
            className="text-neutral-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <HomeLiveTeaser />
            <WhyChooseUsSection />
            <ServicesSection />
            <StatsCounterSection />
            <LiveProjectsSection />
            <PortfolioSection />
            <YouTubeChannelSection />
            <HomeRevenueTeaser />
            <ProductionProcess />
            <ConsultationSection />
            <TeamSection />
            <HomeBlogTeaser />

            {/* Testimonials on Home */}
            <section className="py-20 bg-[#07070a] border-t border-[#14141e]">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
                <div className="text-center space-y-2">
                  <p className="text-xs font-semibold text-[#ff7b00] uppercase tracking-wider">
                    Client Trust & Outcomes
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    What Our Production Partners Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.id}
                      className="p-6 rounded-2xl bg-[#0f0f14] border border-[#20202c] hover:border-[#ff7b00]/30 transition-colors flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                        "{t.quote}"
                      </p>
                      <div className="pt-3 border-t border-[#181822] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{t.author}</p>
                          <p className="text-[11px] text-[#ff7b00]">{t.title} · {t.organization}</p>
                        </div>
                        <span className="text-amber-400 text-xs tracking-widest">★★★★★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs on Home */}
            <FaqSection />

            {/* Bottom Call to Action Section */}
            <section className="py-20 bg-[#080808] border-t border-[#181818] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff7b00]/5 via-transparent to-[#ff2e63]/5 pointer-events-none" />
              <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
                <p className="text-xs font-semibold text-[#ff7b00] uppercase tracking-wider">
                  Nairobi · East Africa · Global
                </p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Let’s Bring Your Vision To Life
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  Reserve your camera crew, sound engineers, and bonded broadcast switcher today. Get a transparent quote and pay deposits manually by M-Pesa after your booking is confirmed.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setCurrentView('booking')}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] hover:opacity-95 text-white font-bold text-xs rounded-xl transition-all shadow-xl cursor-pointer flex items-center gap-2"
                  >
                    <span>Book Your Production</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'about' && <WhoWeArePage />}
        {currentView === 'services' && <ServicesSection />}
        {currentView === 'portfolio' && <PortfolioSection />}
        {currentView === 'blog' && <JournalBlogPage />}
        {currentView === 'youtube-media' && <YouTubeChannelSection />}
        {currentView === 'live-events' && <LiveEventsPage />}
        {currentView === 'pricing' && <PricingPage />}
        {currentView === 'booking' && <BookingPage />}
        {currentView === 'quotation' && <QuotationPage />}
        {currentView === 'equipment' && <EquipmentPage />}
        {currentView === 'client-portal' && <ClientPortal />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentView === 'terms-of-service' && <TermsOfServicePage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Modals */}
      <ShowreelModal />
      <MpesaModal />

      {/* Floating Helpers */}
      <FloatingWhatsApp />
      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
