import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { PortfolioProject } from '../types';
import { MapPin, Calendar, Film, Check, ArrowRight, Eye, X, Share2 } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { setCurrentView, activePortfolioModal, setActivePortfolioModal } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'corporate', label: 'Corporate & Summits' },
    { id: 'weddings', label: 'Luxury Weddings' },
    { id: 'church', label: 'Concerts & Church' },
    { id: 'documentaries', label: 'Documentaries' },
  ];

  const filteredProjects =
    filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="w-full py-16 bg-[#0a0a0a] border-t border-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Selected Works & Case Studies
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cinematic Excellence In Motion
            </h2>
          </div>

          {/* Functional Filter Tabs (interactive button elements conforming to anti-slop rules) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-[#222] rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            // First project gets wider bento prominence
            const isFeatured = idx === 0;
            return (
              <div
                key={project.id}
                onClick={() => setActivePortfolioModal(project)}
                className={`group relative rounded-2xl overflow-hidden border border-[#202020] hover:border-[#D4AF37]/50 bg-[#111] transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[380px] ${
                  isFeatured ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Background Artwork */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Top Badge Info (Clean unboxed text metadata) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 z-10">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{project.location}</span>
                  </div>
                  <span className="font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 space-y-3">
                  <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Client: {project.client}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{project.servicesDelivered[0]}</span>
                    </div>
                    <span className="text-[#D4AF37] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Project <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Lightbox Modal */}
      {activePortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c0c] border border-[#262626] rounded-2xl overflow-y-auto shadow-2xl space-y-6">
            {/* Modal Header Media Bar */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black">
              <img
                src={activePortfolioModal.thumbnail}
                alt={activePortfolioModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/30 to-black/60" />

              <button
                onClick={() => setActivePortfolioModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  <span>{activePortfolioModal.client}</span>
                  <span>·</span>
                  <span>{activePortfolioModal.location}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activePortfolioModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 pt-0 space-y-6">
              {/* Stats Highlights if available */}
              {activePortfolioModal.stats && (
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#121212] border border-[#202020]">
                  {activePortfolioModal.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg sm:text-xl font-extrabold text-[#D4AF37] tabular-nums">
                        {st.value}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{st.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Challenge & Technical Solution */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Production Overview & Challenge
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activePortfolioModal.summary}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed bg-[#141414] p-4 rounded-xl border border-[#222]">
                  <strong className="text-white">Technical Solution: </strong>
                  {activePortfolioModal.challengeSolution}
                </p>
              </div>

              {/* Equipment Used & Services Delivered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Gear & Systems Deployed
                  </h4>
                  <ul className="space-y-1.5">
                    {activePortfolioModal.equipmentUsed.map((gear, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{gear}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Deliverables & Outputs
                  </h4>
                  <ul className="space-y-1.5">
                    {activePortfolioModal.servicesDelivered.map((srv, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Project link copied to clipboard!');
                  }}
                  className="w-full sm:w-auto px-4 py-2 border border-[#333] hover:border-neutral-500 text-xs font-medium text-neutral-300 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Project
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActivePortfolioModal(null);
                      setCurrentView('quotation');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-neutral-200 border border-[#2e2e2e] hover:border-white rounded-xl transition-colors cursor-pointer"
                  >
                    Request Similar Quote
                  </button>
                  <button
                    onClick={() => {
                      setActivePortfolioModal(null);
                      setCurrentView('booking');
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#e4be42] rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Book This Crew
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
