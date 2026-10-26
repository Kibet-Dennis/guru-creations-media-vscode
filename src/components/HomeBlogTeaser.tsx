import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, Clock, Tag, X } from 'lucide-react';
import { BlogPost } from '../types';

export const HomeBlogTeaser: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Take the first 3 posts
  const previewPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="w-full py-20 bg-[#08080a] border-t border-[#16161e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#ff7b00]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights & Articles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From The <span className="bg-gradient-to-r from-[#ff7b00] to-[#ff2e63] bg-clip-text text-transparent">Guru Journal</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
              Actionable guides on 4K livestreaming, photography techniques, brand scaling, and creative technology in East Africa.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('blog')}
            className="px-5 py-2.5 bg-[#141418] hover:bg-[#1e1e24] border border-[#282834] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 self-start md:self-end"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#ff7b00]" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl bg-[#0f0f14] border border-[#20202c] hover:border-[#ff7b00]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-semibold text-[#ff7b00] border border-white/10 flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff7b00]" />
                  4 min read
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] text-neutral-400 font-mono">{post.date}</p>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff7b00] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1b1b24] flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(post)}
                    className="text-xs font-semibold text-[#ff7b00] hover:text-[#ff9d3b] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-neutral-500 font-mono">By Dennis Kibet</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#101016] border border-[#262634] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-[#20202c] flex items-center justify-between bg-[#14141c]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#ff7b00]/20 text-[#ff7b00] text-xs font-semibold">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-[#1e1e28] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeArticle.title}
              </h2>

              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-56 object-cover rounded-xl border border-[#222230]"
              />

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-[#1e1e28] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Guru Media Editorial Team</p>
                  <p className="text-[11px] text-neutral-400">Nairobi, Kenya</p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    setCurrentView('blog');
                  }}
                  className="px-4 py-2 bg-[#ff7b00] hover:bg-[#ff8f24] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Explore More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
