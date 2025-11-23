import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, Sparkles, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import Fuse from 'fuse.js';
import { loadAllContent, getCategories } from '../utils/contentLoader';
import ResourceCard from '../components/ResourceCenter/ResourceCard';
import SEO from '../components/SEO';

// Particle Background Component
const ParticleBackground = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          backgroundColor: color,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const ResourceCenterPage = ({ navigate }) => {
  const [allContent, setAllContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load content on mount
  useEffect(() => {
    const content = loadAllContent();
    console.log('ResourceCenterPage - loaded content:', content);
    setAllContent(content);
    setFilteredContent(content);
    setCategories(getCategories());
  }, []);

  // Fuse.js configuration for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(allContent, {
      keys: ['title', 'excerpt', 'categories', 'tags', 'author'],
      threshold: 0.3,
      includeScore: true
    });
  }, [allContent]);

  // Filter and search content
  useEffect(() => {
    let result = [...allContent];

    // Apply type filter
    if (selectedType !== 'all') {
      result = result.filter(item => item.type === selectedType);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item =>
        item.categories && item.categories.includes(selectedCategory)
      );
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      const searchIds = new Set(searchResults.map(r => r.item.id));
      result = result.filter(item => searchIds.has(item.id));
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate || 0) - new Date(a.publishDate || 0);
        case 'oldest':
          return new Date(a.publishDate || 0) - new Date(b.publishDate || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredContent(result);
  }, [allContent, selectedType, selectedCategory, searchQuery, sortBy, fuse]);

  // Handle content click
  const handleContentClick = (item) => {
    navigate(`resource/${item.type}/${item.slug}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  // Get featured content (first 3 items)
  const featuredContent = allContent.slice(0, 3);

  // Count by type
  const countByType = (type) => {
    return allContent.filter(item => item.type === type).length;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* SEO Meta Tags */}
      <SEO
        title="Resource Center"
        description="Need helpful content on leadership, marketing, or sales? Explore articles, podcasts, and resources to become superhuman..."
        slug="/resources"
        type="website"
      />

      {/* Hero Section */}
      <section className="bg-[#142d63] text-white py-32 md:py-40 text-center relative overflow-hidden">
        {/* Gradient Blur Circles */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>

        {/* Particle Background */}
        <ParticleBackground color="#faaa68" />

        {/* Breathing Wave Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full"
              style={{
                background: `radial-gradient(ellipse at ${20 + i * 20}% ${30 + i * 15}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="max-w-5xl mx-auto px-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
          >
            <span className="text-[#faaa68] flex items-center gap-2 text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              Knowledge. Growth. Impact.
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Resource Center
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Articles, podcasts, and resources to help you become superhuman in business and life.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-8 text-sm flex-wrap"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#028393] rounded-full"></div>
              <span>{countByType('article')} Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#f65625] rounded-full"></div>
              <span>{countByType('podcast')} Podcasts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#faaa68] rounded-full"></div>
              <span>{countByType('offer')} Resources</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Content - Overlapping Hero */}
      {!searchQuery && selectedType === 'all' && selectedCategory === 'all' && featuredContent.length > 0 && (
        <div className="container mx-auto px-6 relative z-20 -mt-32 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#142d63]">Featured Content</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredContent.map((item) => (
                <ResourceCard key={item.id} item={item} onClick={handleContentClick} />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Filters & Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Unified Search & Filter Bar */}
        <div className="bg-[#142d63] rounded-2xl shadow-xl border border-[#028393]/30 p-6 mb-8 relative z-10">
          {/* Search Bar - Top Row */}
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Search articles, podcasts, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/60 text-base focus:outline-none focus:border-[#f65625] focus:bg-white/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white/80" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Type Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'article', 'podcast', 'offer'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-[#f65625] to-[#faaa68] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                  }`}
                >
                  {type === 'all' ? 'All Content' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                  <span className="ml-2 opacity-75">
                    ({type === 'all' ? allContent.length : countByType(type)})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Category Dropdown - Enhanced */}
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white/10 border-2 border-white/20 text-white pl-11 pr-10 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer focus:outline-none focus:border-[#f65625] focus:bg-white/20"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-[#142d63] text-white">{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
            </div>

            {/* Sort Dropdown - Enhanced */}
            <div className="relative group">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/10 border-2 border-white/20 text-white pl-11 pr-10 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer focus:outline-none focus:border-[#f65625] focus:bg-white/20"
              >
                <option value="newest" className="bg-[#142d63] text-white">Newest First</option>
                <option value="oldest" className="bg-[#142d63] text-white">Oldest First</option>
                <option value="title" className="bg-[#142d63] text-white">A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
            </div>

            {/* View Mode Toggle - Enhanced */}
            <div className="flex gap-1 bg-white/10 p-1.5 rounded-xl border-2 border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#142d63] shadow-md' : 'text-white/60 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white text-[#142d63] shadow-md' : 'text-white/60 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters - Enhanced */}
          {(selectedType !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 pt-6 mt-6 border-t-2 border-white/20">
              <span className="text-sm text-white/80 font-bold">Active:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028393] to-[#028393]/80 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f65625] to-[#faaa68] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">
                  {selectedType}
                  <button onClick={() => setSelectedType('all')} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#142d63] to-[#028393] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="ml-auto text-sm text-[#faaa68] font-bold hover:text-white transition-colors px-4 py-2 hover:bg-white/10 rounded-xl"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#142d63]">{filteredContent.length}</span> {filteredContent.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {filteredContent.length > 0 ? (
            <motion.div
              key="content-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
            >
              {filteredContent.map((item) => (
                <ResourceCard key={item.id} item={item} onClick={handleContentClick} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No results found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#f65625] text-white px-6 py-3 rounded-full font-bold hover:bg-[#142d63] transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResourceCenterPage;
