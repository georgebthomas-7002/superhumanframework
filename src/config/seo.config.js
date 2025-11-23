/**
 * Centralized SEO Configuration
 *
 * This file contains all SEO defaults and site-wide information.
 * Update these values to change SEO across the entire site.
 */

export const seoConfig = {
  // Site Information
  siteName: 'Superhuman Framework',
  siteUrl: 'https://sidekickstrategies.com',

  // Default Meta Tags (used when page doesn't specify)
  defaultTitle: 'Superhuman Framework - Stop Drifting. Start Designing.',
  defaultDescription: 'The Operating System for high-performance leadership, business, and life. Don\'t just work harder. Upgrade your internal software.',

  // Social Media / Open Graph
  defaultOgImage: '/og-image.svg', // 1200x630px - Replace with custom image later
  twitterHandle: '@placeholder', // Update with your Twitter handle

  // Organization Information (for JSON-LD structured data)
  organization: {
    name: 'Superhuman Framework',
    legalName: 'Sidekick Strategies, Inc.',
    url: 'https://sidekickstrategies.com',
    logo: 'https://sidekickstrategies.com/logo.png',
    foundingDate: '2020', // Update with actual founding date
    founders: [
      {
        '@type': 'Person',
        name: 'George B. Thomas',
        jobTitle: 'Founder & CEO',
        url: 'https://sidekickstrategies.com/founder'
      }
    ],
    // Social Media Profiles (update these with your actual URLs)
    sameAs: [
      'https://www.linkedin.com/company/placeholder',
      'https://www.linkedin.com/in/placeholder',
      'https://www.instagram.com/placeholder',
      'https://www.youtube.com/@placeholder',
      'https://twitter.com/placeholder'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@sidekickstrategies.com',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    }
  },

  // Author Information (for blog posts)
  defaultAuthor: {
    '@type': 'Person',
    name: 'George B. Thomas',
    url: 'https://sidekickstrategies.com/founder',
    jobTitle: 'Founder & CEO',
    sameAs: [
      'https://www.linkedin.com/in/placeholder',
      'https://twitter.com/placeholder'
    ]
  }
};

/**
 * Generate full URL from a path/slug
 * @param {string} path - Path or slug (e.g., '/resources' or 'article/my-post')
 * @returns {string} Full URL
 */
export const getFullUrl = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${seoConfig.siteUrl}/${cleanPath}`;
};

/**
 * Generate page title with site name
 * @param {string} title - Page title
 * @param {boolean} includeSiteName - Whether to append site name
 * @returns {string} Formatted title
 */
export const getTitle = (title, includeSiteName = true) => {
  if (!title) return seoConfig.defaultTitle;
  return includeSiteName ? `${title} | ${seoConfig.siteName}` : title;
};

/**
 * Meta description formatter - ensures SEO best practices
 * Format: Question? Main content teaser...
 * Max length: 160 characters
 *
 * @param {string} description - Page description
 * @returns {string} Formatted description (max 160 chars)
 */
export const formatMetaDescription = (description) => {
  if (!description) return seoConfig.defaultDescription;

  // Truncate to 160 characters if too long
  if (description.length > 160) {
    return description.substring(0, 157) + '...';
  }

  return description;
};

/**
 * Generate breadcrumb structured data
 * @param {Array} items - Array of {name, url} objects
 * @returns {Object} JSON-LD breadcrumb schema
 */
export const generateBreadcrumbs = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};
