import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS, COMPANY_INFO } from '../data/mockData';
import { BlogPost } from '../types';
import {
  Search,
  BookOpen,
  ArrowRight,
  ArrowDown,
  X,
  Share2,
  Calendar,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const JournalBlogPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['all', 'Streaming', 'Photography', 'Business', 'Marketing', 'Branding', 'Web Design'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#101114] text-[#f7f6f2] py-10">
      {/* Journal Hero Section (Styled matching original blog1.html) */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-8 border-b border-white/10 bg-radial-[ellipse_at_80%_45%] from-[#ff477e]/15 via-[#ff7b38]/10 to-[#101114]">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#ff7b38] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ff7b38] shadow-[0_0_12px_rgba(255,123,56,0.8)]" />
            <span>THE GURU JOURNAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
            Ideas that move <br />
            <span className="bg-gradient-to-r from-[#ff7b38] to-[#ff477e] bg-clip-text text-transparent">
              your brand forward.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#b6b6bd] max-w-xl font-light">
            Fresh thinking on content, creativity, and building a digital presence that means something.
          </p>

          <div className="pt-2">
            <a
              href="#stories"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff7b38] border-b border-[#ff7b38]/50 pb-1 hover:border-[#ff7b38] transition-colors"
            >
              <span>Explore the latest stories</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Journal Content Area */}
      <main id="stories" className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-10">
        {/* Section Heading & Note */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-bold text-[#ff7b38] uppercase tracking-wider">
              Thoughts & Perspectives
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              The latest stories<span className="text-[#ff7b38]">.</span>
            </h2>
          </div>
          <p className="text-xs text-[#a5a6ad]">Useful ideas. No noise.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 bg-[#17181c] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="relative w-full sm:flex-1 flex items-center">
            <Search className="w-4 h-4 text-[#9a9ba2] absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full bg-transparent pl-10 pr-4 py-2 text-xs text-white placeholder-[#92939b] focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-xs text-[#a5a6ad] whitespace-nowrap">Explore by:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#1d1e23] border border-white/15 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#ff7b38] cursor-pointer"
            >
              <option value="all">All Topics</option>
              {categories.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <p className="text-xs text-[#a5a6ad] font-mono">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
        </p>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-[#17181c] rounded-2xl border border-white/10">
            <p className="text-sm text-[#a5a6ad]">No stories match your search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#ff7b38] underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="group bg-[#17181c] border border-white/10 hover:border-[#ff7b38]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Cover */}
                <div className="relative aspect-[1.63/1] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded text-[11px] font-bold text-[#ff7b38] uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff7b38] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#a5a6ad] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-500 font-mono">{post.date}</span>
                    <span className="font-bold text-white group-hover:text-[#ff7b38] flex items-center gap-1 transition-colors">
                      <span>Read the story</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ff7b38] transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Post Modal (Original postModal from blog1.html) */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#17181c] border border-white/15 rounded-2xl overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold text-[#ff7b38] uppercase tracking-wider">
                  {activePost.category} · {activePost.date}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activePost.title}
                </h2>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video w-full bg-black">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-xs sm:text-sm text-[#c5c5cb] leading-relaxed whitespace-pre-line space-y-4">
              {activePost.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#a5a6ad]">
                <Sparkles className="w-4 h-4 text-[#ff7b38]" />
                <span>Written by Guru Creations Editorial Team</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Story link copied to clipboard!');
                  }}
                  className="px-4 py-2 border border-white/20 hover:border-white text-xs text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Story</span>
                </button>
                <button
                  onClick={() => {
                    setActivePost(null);
                    setCurrentView('booking');
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-[#ff7b38] to-[#ff477e] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Book With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
