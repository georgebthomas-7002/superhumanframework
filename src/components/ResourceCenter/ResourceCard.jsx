import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Mic, FileText, Gift, Play } from 'lucide-react';

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
      {/* Featured Image */}
      {item.featuredImage && (
        <div className="relative h-48 bg-gradient-to-br from-[#142d63] to-[#028393] overflow-hidden">
          <img
            src={item.featuredImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {item.type === 'podcast' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <Play className="w-16 h-16 text-white opacity-80" />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Type Badge & Categories */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${getTypeBadgeColor()}`}>
            {getTypeIcon()}
            {item.type}
          </div>
          {item.categories && item.categories.slice(0, 2).map((category, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {category}
            </div>
          ))}
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
