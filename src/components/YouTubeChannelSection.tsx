import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { YOUTUBE_VIDEOS, COMPANY_INFO } from '../data/mockData';
import { YouTubeVideo } from '../types';
import {
  Play,
  Eye,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Tv,
  Share2,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const YouTubeChannelSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [filter, setFilter] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const categories = [
    'All',
    'Aerial & Nature',
    'Corporate & Events',
    'Memorial & Cultural',
    'Livestream',
  ];

  const filteredVideos =
    filter === 'All'
      ? YOUTUBE_VIDEOS
      : YOUTUBE_VIDEOS.filter((v) => v.category === filter);

  return (
    <section className="w-full py-16 bg-[#080808] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* YouTube Channel Hero Card */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#141414] border border-[#242424] p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              {/* Channel Avatar */}
              <div className="w-16 h-16 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center text-xl shadow-lg shrink-0 border-2 border-white/20">
                <Tv className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Guru Creations Ltd
                  </h3>
                  <span className="text-xs bg-red-600/20 text-red-400 border border-red-600/30 px-2 py-0.5 rounded font-mono font-semibold">
                    {COMPANY_INFO.youtubeHandle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
                  Official digital media channel founded by <strong className="text-white">Dennis Kibet</strong>. Producing original aerial documentaries, cultural features, Kenyan landscapes, and live event broadcasts.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-300 pt-1 font-mono">
                  <span>12.5K+ Subscribers</span>
                  <span>·</span>
                  <span>180+ Videos</span>
                  <span>·</span>
                  <span>2.4M+ Total Views</span>
                </div>
              </div>
            </div>

            {/* Subscribe Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={COMPANY_INFO.youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] active:bg-[#990000] text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Tv className="w-4 h-4 fill-current" />
                <span>Subscribe on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setCurrentView('booking')}
                className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-[#D4AF37] text-xs font-semibold text-neutral-200 rounded-xl transition-all cursor-pointer"
              >
                Commission a Video
              </button>
            </div>
          </div>
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Original Productions & Documentaries
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Video Releases
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-[#222] rounded-xl max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group bg-[#0e0e0e] border border-[#1f1f1f] hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-white border border-white/10">
                  {video.duration}
                </div>

                {/* Center Play Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Category tag */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] text-[#D4AF37] border border-white/10 font-medium">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{video.views} views</span>
                  </span>
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0c0c0c] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#080808] border-b border-[#1c1c1c]">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-red-500" />
                <span className="text-xs font-semibold text-white">
                  Guru Creations Ltd · {selectedVideo.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1a1a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen Area */}
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                  title="Watch on YouTube"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </a>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <span className="bg-black/80 px-2 py-0.5 rounded font-mono">
                  4K UHD Cinema · High Bitrate
                </span>
                <span className="bg-black/80 px-2 py-0.5 rounded font-mono">
                  Duration: {selectedVideo.duration}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 pt-0 space-y-4">
              <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {selectedVideo.description}
              </p>

              <div className="pt-4 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
                  <span>{selectedVideo.views} views</span>
                  <span>·</span>
                  <span>Released: {selectedVideo.date}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Tv className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full Video on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      setSelectedVideo(null);
                      setCurrentView('booking');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#D4AF37] hover:bg-[#e4be42] text-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Commission Similar Work
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
