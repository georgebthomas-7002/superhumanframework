import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List, ChevronRight } from 'lucide-react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract H2 headings from markdown content
    const h2Regex = /^##\s+\*?\*?(.+?)\*?\*?$/gm;
    const matches = [];
    let match;

    while ((match = h2Regex.exec(content)) !== null) {
      const title = match[1].trim();
      // Create slug from title (same as rehype-slug does)
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Skip FAQ section
      if (!title.toLowerCase().includes('frequently asked questions')) {
        matches.push({ title, slug });
      }
    }

    setHeadings(matches);
  }, [content]);

  useEffect(() => {
    // Set up intersection observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    // Observe all h2 elements
    const h2Elements = document.querySelectorAll('article h2');
    h2Elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 100; // Account for fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 mb-12 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#028393] rounded-lg">
          <List className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#142d63] m-0">Table of Contents</h2>
      </div>

      <nav className="space-y-3">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.slug)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all group ${
              activeId === heading.slug
                ? 'bg-[#028393] text-white shadow-md'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <ChevronRight
              className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform ${
                activeId === heading.slug
                  ? 'text-white translate-x-1'
                  : 'text-[#028393] group-hover:translate-x-1'
              }`}
            />
            <span className={`font-medium leading-snug ${
              activeId === heading.slug ? 'text-white' : 'text-gray-800'
            }`}>
              {heading.title}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-[#142d63]">Quick Navigation:</span> Click any section above to jump directly to that part of the article.
        </p>
      </div>
    </motion.div>
  );
};

export default TableOfContents;
