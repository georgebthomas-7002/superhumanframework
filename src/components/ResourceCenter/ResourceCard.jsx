import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Mic, FileText, Gift, Play, BookOpen } from 'lucide-react';

const ResourceCard = ({ item, onClick }) => {
  // Get icon based on content type
  const getTypeIcon = () => {
    switch (item.type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'podcast':
        return <Mic className="w-5 h-5" />;
      case 'offer':
        return <Gift className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  // Get type badge color
  const getTypeBadgeColor = () => {
    switch (item.type) {
      case 'article':
        return 'bg-[#028393] text-white';
      case 'podcast':
        return 'bg-[#f65625] text-white';
      case 'offer':
        return 'bg-[#142d63] text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full group"
    >
      {/* Creative Header - No images needed */}
      <div className="relative overflow-hidden h-48">
        {/* Gradient background based on type and categories */}
        <div className={`absolute inset-0 ${
          item.type === 'article'
            ? 'bg-gradient-to-br from-[#f65625] via-[#faaa68] to-[#028393]'
            : item.type === 'podcast'
            ? 'bg-gradient-to-br from-[#028393] via-[#142d63] to-[#f65625]'
            : 'bg-gradient-to-br from-[#142d63] via-[#028393] to-[#faaa68]'
        } opacity-90`}></div>

        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full border-2 border-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Icon based on type */}
        <div className="absolute inset-0 flex items-center justify-center">
          {item.type === 'article' ? (
            <BookOpen className="w-20 h-20 text-white opacity-80" />
          ) : item.type === 'podcast' ? (
            <Mic className="w-20 h-20 text-white opacity-80" />
          ) : (
            <Gift className="w-20 h-20 text-white opacity-80" />
          )}
        </div>

        {/* Categories overlay */}
        {item.categories && item.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-[#142d63] rounded-full shadow-lg"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${getTypeBadgeColor()}`}>
            {getTypeIcon()}
            {item.type}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#142d63] mb-3 line-clamp-2 group-hover:text-[#f65625] transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {item.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
          {item.publishDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.publishDate)}</span>
            </div>
          )}
          {item.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{item.readTime} min read</span>
            </div>
          )}
          {item.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{item.duration}</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <div className="mt-4 flex items-center gap-2 text-[#f65625] font-bold group-hover:gap-3 transition-all">
          <span>
            {item.type === 'article' && 'Read Article'}
            {item.type === 'podcast' && 'Listen Now'}
            {item.type === 'offer' && 'Get Resource'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
