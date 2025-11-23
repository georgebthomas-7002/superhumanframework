import matter from 'gray-matter';

// This will be populated with actual content files
// Content files should be in /src/content/{type}/{slug}.md
const contentModules = {
  articles: import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default', eager: true }),
  podcasts: import.meta.glob('/src/content/podcasts/*.md', { query: '?raw', import: 'default', eager: true }),
  offers: import.meta.glob('/src/content/offers/*.md', { query: '?raw', import: 'default', eager: true })
};

/**
 * Load all content from markdown files
 * @returns {Array} Array of all content items with metadata
 */
export const loadAllContent = () => {
  const allContent = [];

  // Debug logging
  console.log('[ContentLoader] Loading content...');
  console.log('[ContentLoader] Content modules:', Object.keys(contentModules));
  Object.entries(contentModules).forEach(([type, modules]) => {
    console.log(`[ContentLoader] ${type}: ${Object.keys(modules).length} files`);
  });

  // Process each content type
  Object.entries(contentModules).forEach(([type, modules]) => {
    Object.entries(modules).forEach(([filepath, raw]) => {
      try {
        const { data, content } = matter(raw);

        // Extract slug from filepath
        const slug = filepath.split('/').pop().replace('.md', '');

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
      } catch (error) {
        console.error(`Error loading content from ${filepath}:`, error);
      }
    });
  });

  // Sort by publish date (newest first)
  const sorted = allContent.sort((a, b) => {
    const dateA = new Date(a.publishDate || 0);
    const dateB = new Date(b.publishDate || 0);
    return dateB - dateA;
  });

  console.log(`[ContentLoader] Total content loaded: ${sorted.length}`);
  console.log('[ContentLoader] Content items:', sorted.map(item => ({ slug: item.slug, type: item.type, title: item.title })));

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
