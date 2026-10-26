import React from 'react';
import { COMPANY_INFO, BROADCAST_IMAGE, HERO_IMAGE, WEDDING_IMAGE } from '../data/mockData';
import { ExternalLink, Globe, Laptop, Church, ShoppingBag } from 'lucide-react';

export const LiveProjectsSection: React.FC = () => {
  const liveProjects = [
    {
      title: 'Dennis Kibet - Software & Media Portfolio',
      url: COMPANY_INFO.personalPortfolio,
      desc: 'Official portfolio of Dennis Kibet (DennisRono), showcasing full-stack engineering, mobile apps, and digital creations.',
      category: 'Developer Portfolio',
      icon: Laptop,
      image: HERO_IMAGE,
    },
    {
      title: 'Friends Church (Quakers), Kabete',
      url: COMPANY_INFO.friendsChurchLiveUrl,
      desc: 'A welcoming online home and livestreaming architecture for the Kabete Quaker congregation.',
      category: 'Community & Church',
      icon: Church,
      image: BROADCAST_IMAGE,
    },
    {
      title: 'Guru Creations Wear Storefront',
      url: 'https://kibet-dennis.github.io/guru-creations/',
      desc: 'An online storefront built to bring the Guru Creations Wear brand and streetwear line to life.',
      category: 'E-Commerce Platform',
      icon: ShoppingBag,
      image: WEDDING_IMAGE,
    },
  ];

  return (
    <section className="w-full py-16 bg-[#0a0a14] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase">
            DEPLOYED SITES & CLIENT HUBS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Live Web Projects
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Click any project below to open the deployed live site in a new browser tab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveProjects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <a
                key={idx}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-[#141424] border border-white/10 hover:border-[#ff7b00]/60 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-[#ff7b00] uppercase tracking-wider bg-black/70 px-2.5 py-0.5 rounded border border-white/10">
                      {proj.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#ff7b00] transition-colors flex items-center justify-between">
                      <span>{proj.title}</span>
                      <ExternalLink className="w-4 h-4 text-[#ff7b00] shrink-0" />
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#ff7b00]">
                  <span>Visit Live Website</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
