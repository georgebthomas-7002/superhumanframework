import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// EXPLICIT IMPORTS - More reliable than glob in production
import article1 from '../content/articles/building-trust-at-scale.md?raw';
import article2 from '../content/articles/ceo-dilemma-scale-humanity.md?raw';
import article3 from '../content/articles/from-transactional-to-transformational-leadership.md?raw';
import article4 from '../content/articles/stop-buying-ping-pong-tables.md?raw';
import article5 from '../content/articles/the-art-of-helpful-content.md?raw';

import podcast1 from '../content/podcasts/ep-001-from-burnout-to-breakthrough.md?raw';
import podcast2 from '../content/podcasts/ep-002-the-five-pillars-framework.md?raw';

import offer1 from '../content/offers/superhuman-leadership-assessment.md?raw';

// Map of all content files with their types
const contentFiles = {
  articles: {
    'building-trust-at-scale': article1,
    'ceo-dilemma-scale-humanity': article2,
    'from-transactional-to-transformational-leadership': article3,
    'stop-buying-ping-pong-tables': article4,
    'the-art-of-helpful-content': article5,
  },
  podcasts: {
    'ep-001-from-burnout-to-breakthrough': podcast1,
    'ep-002-the-five-pillars-framework': podcast2,
  },
  offers: {
    'superhuman-leadership-assessment': offer1,
  }
};

/**
 * Load all content from markdown files
 * @returns {Array} Array of all content items with metadata
 */
// Global debug log that will be displayed in UI
export const debugLog = [];

export const loadAllContent = () => {
  const allContent = [];
  debugLog.length = 0; // Clear previous logs

  // Debug logging
  debugLog.push('===== START LOADING CONTENT =====');
  debugLog.push(`contentFiles defined? ${typeof contentFiles}`);
  debugLog.push(`contentFiles keys: ${contentFiles ? Object.keys(contentFiles).join(', ') : 'UNDEFINED'}`);
  debugLog.push(`article1 type: ${typeof article1}`);
  debugLog.push(`article1 length: ${article1 ? article1.length : 'undefined'}`);
  debugLog.push(`article1 preview: ${article1 ? article1.substring(0, 50) + '...' : 'undefined'}`);

  // Process each content type
  Object.entries(contentFiles).forEach(([type, files]) => {
    debugLog.push(`Processing ${type}: ${Object.keys(files).length} files`);

    Object.entries(files).forEach(([slug, raw]) => {
      debugLog.push(`  - ${slug}: type=${typeof raw}, length=${raw ? raw.length : 0}`);

      try {
        if (!raw || typeof raw !== 'string') {
          const error = `Invalid raw content for ${slug}: type is ${typeof raw}`;
          debugLog.push(`    ✗ ERROR: ${error}`);
          throw new Error(error);
        }

        debugLog.push(`    Parsing with gray-matter...`);
        const { data, content } = matter(raw);
        debugLog.push(`    ✓ Matter parsed! Title: ${data.title || 'NO TITLE'}`);

        // Calculate read time for articles (rough estimate: 200 words per minute)
        let readTime = null;
        if (type === 'articles') {
          const wordCount = content.split(/\s+/).length;
          readTime = Math.ceil(wordCount / 200);
        }

        allContent.push({
          id: slug,
          slug,
          type: type.slice(0, -1), // Remove 's' from 'articles' -> 'article'
          content,
          readTime,
          ...data
        });
        debugLog.push(`    ✓ Item added to allContent array`);
      } catch (error) {
        debugLog.push(`    ✗ EXCEPTION: ${error.message}`);
        debugLog.push(`    Stack: ${error.stack?.substring(0, 150) || 'no stack'}`);
        console.error(`Error loading content ${slug}:`, error);
      }
    });
  });

  // Sort by publish date (newest first)
  const sorted = allContent.sort((a, b) => {
    const dateA = new Date(a.publishDate || 0);
    const dateB = new Date(b.publishDate || 0);
    return dateB - dateA;
  });

  debugLog.push(`===== TOTAL LOADED: ${sorted.length} items =====`);

  return sorted;
};

/**
 * Load a single content item by slug and type
 * @param {string} slug - The content slug
 * @param {string} type - The content type (article, podcast, offer)
 * @returns {Object|null} The content item or null if not found
 */
export const loadContentBySlug = (slug, type) => {
  const allContent = loadAllContent();
  return allContent.find(item => item.slug === slug && item.type === type) || null;
};

/**
 * Get unique categories from all content
 * @returns {Array} Array of unique category names
 */
export const getCategories = () => {
  const allContent = loadAllContent();
  const categories = new Set();

  allContent.forEach(item => {
    if (item.categories && Array.isArray(item.categories)) {
      item.categories.forEach(cat => categories.add(cat));
    }
  });

  return Array.from(categories).sort();
};

/**
 * Get unique tags from all content
 * @returns {Array} Array of unique tag names
 */
export const getTags = () => {
  const allContent = loadAllContent();
  const tags = new Set();

  allContent.forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
};

/**
 * Get related content based on categories and tags
 * @param {Object} currentItem - The current content item
 * @param {number} limit - Maximum number of related items to return
 * @returns {Array} Array of related content items
 */
export const getRelatedContent = (currentItem, limit = 3) => {
  const allContent = loadAllContent();

  // Filter out current item
  const otherContent = allContent.filter(item => item.slug !== currentItem.slug);

  // Score each item based on shared categories and tags
  const scored = otherContent.map(item => {
    let score = 0;

    // Check category matches
    if (currentItem.categories && item.categories) {
      const sharedCategories = currentItem.categories.filter(cat =>
        item.categories.includes(cat)
      );
      score += sharedCategories.length * 3; // Categories worth more
    }

    // Check tag matches
    if (currentItem.tags && item.tags) {
      const sharedTags = currentItem.tags.filter(tag =>
        item.tags.includes(tag)
      );
      score += sharedTags.length;
    }

    return { ...item, score };
  });

  // Sort by score and return top items
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
