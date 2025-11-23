import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Mic, FileText, Gift, BookOpen } from 'lucide-react';

const ResourceCard = ({ item, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  // Handle mouse move for glow effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden border border-gray-200 flex flex-col h-full group relative"
      style={{
        boxShadow: isHovered
          ? '0 25px 50px rgba(20, 45, 99, 0.15), 0 10px 20px rgba(246, 86, 37, 0.1)'
          : undefined
      }}
    >
      {/* Glow effect on hover - Digital Marmalade inspired */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            top: mousePosition.y - 150,
            left: mousePosition.x - 150,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, rgba(246, 86, 37, 0.15) 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Creative Header - Cleaner, more spacious */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Simplified gradient overlay based on type */}
        <div
          className={`absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity duration-300 ${
            item.type === 'article'
              ? 'bg-gradient-to-br from-[#028393]/20 via-[#f65625]/10 to-transparent'
              : item.type === 'podcast'
              ? 'bg-gradient-to-br from-[#f65625]/20 via-[#faaa68]/10 to-transparent'
              : 'bg-gradient-to-br from-[#142d63]/20 via-[#028393]/10 to-transparent'
          }`}
        />

        {/* Minimal geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`pattern-${item.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#142d63" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${item.id})`} />
          </svg>
        </div>

        {/* Clean icon centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-2xl ${
              item.type === 'article'
                ? 'bg-[#028393]/90'
                : item.type === 'podcast'
                ? 'bg-[#f65625]/90'
                : 'bg-[#142d63]/90'
            } backdrop-blur-sm shadow-xl`}
          >
            {item.type === 'article' ? (
              <BookOpen className="w-12 h-12 text-white" />
            ) : item.type === 'podcast' ? (
              <Mic className="w-12 h-12 text-white" />
            ) : (
              <Gift className="w-12 h-12 text-white" />
            )}
          </motion.div>
        </div>

        {/* Categories - cleaner positioning */}
        {item.categories && item.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white backdrop-blur-sm text-xs font-bold text-[#142d63] rounded-lg shadow-md border border-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content - More spacious */}
      <div className="p-8 flex flex-col flex-1">
        {/* Type Badge - Cleaner style */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase ${getTypeBadgeColor()} shadow-sm`}>
            {getTypeIcon()}
            {item.type}
          </div>
        </div>

        {/* Title - Bolder typography */}
        <h3 className="text-2xl font-extrabold text-[#142d63] mb-4 line-clamp-2 group-hover:text-[#f65625] transition-colors duration-300 leading-tight">
          {item.title}
        </h3>

        {/* Excerpt - Better readability */}
        {item.excerpt && (
          <p className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed text-base">
            {item.excerpt}
          </p>
        )}

        {/* Meta Information - Cleaner layout */}
        <div className="flex items-center gap-5 text-sm text-gray-500 mt-auto pt-6 border-t border-gray-200">
          {item.publishDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#028393]" />
              <span className="font-medium">{formatDate(item.publishDate)}</span>
            </div>
          )}
          {item.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f65625]" />
              <span className="font-medium">{item.readTime} min</span>
            </div>
          )}
          {item.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f65625]" />
              <span className="font-medium">{item.duration}</span>
            </div>
          )}
        </div>

        {/* Read More Link - Animated */}
        <motion.div
          className="mt-5 flex items-center gap-2 text-[#f65625] font-bold"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-base">
            {item.type === 'article' && 'Read Article'}
            {item.type === 'podcast' && 'Listen Now'}
            {item.type === 'offer' && 'Get Resource'}
          </span>
          <motion.div
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
