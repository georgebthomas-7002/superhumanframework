import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig, getFullUrl, getTitle, formatMetaDescription } from '../config/seo.config';

/**
 * SEO Component - Manages all meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
 *
 * @param {Object} props
 * @param {string} props.title - Page title (will append site name automatically)
 * @param {string} props.description - Meta description (use format: "Question? Teaser content...")
 * @param {string} props.slug - Page path (e.g., "/resources" or "resource/article/my-post")
 * @param {string} props.type - Content type: "website", "article", "offer", "podcast" (default: "website")
 * @param {string} props.image - Open Graph image URL (defaults to site OG image)
 * @param {string} props.imageAlt - Alt text for OG image
 * @param {boolean} props.noIndex - Set to true to prevent indexing (default: false)
 * @param {string} props.publishedTime - ISO date string for articles (e.g., "2025-01-15T08:00:00Z")
 * @param {string} props.modifiedTime - ISO date string for last modification
 * @param {string} props.author - Author name (defaults to George B. Thomas)
 * @param {Array<string>} props.tags - Array of tags/keywords for articles
 * @param {Array<string>} props.categories - Array of categories for articles
 * @param {Object} props.breadcrumbs - Array of {name, url} for breadcrumb navigation
 * @param {Object} props.customSchema - Additional JSON-LD schema to inject
 */
const SEO = ({
  title,
  description,
  slug = '/',
  type = 'website',
  image,
  imageAlt,
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  categories = [],
  breadcrumbs,
  customSchema
}) => {
  // Generate full URLs
  const pageUrl = getFullUrl(slug);
  const ogImage = image || getFullUrl(seoConfig.defaultOgImage);

  // Format title and description
  const pageTitle = getTitle(title);
  const metaDescription = formatMetaDescription(description || seoConfig.defaultDescription);

  // Determine content type for Open Graph
  const ogType = type === 'article' ? 'article' : 'website';

  // Build JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebSite Schema (appears on all pages)
      {
        '@type': 'WebSite',
        '@id': `${seoConfig.siteUrl}/#website`,
        url: seoConfig.siteUrl,
        name: seoConfig.siteName,
        description: seoConfig.defaultDescription,
        publisher: {
          '@id': `${seoConfig.siteUrl}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${seoConfig.siteUrl}/resources?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },

      // 2. Organization Schema
      {
        '@type': 'Organization',
        '@id': `${seoConfig.siteUrl}/#organization`,
        ...seoConfig.organization
      },

      // 3. WebPage or Article Schema
      type === 'article' ? {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title || seoConfig.defaultTitle,
        description: metaDescription,
        url: pageUrl,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: author ? {
          '@type': 'Person',
          name: author
        } : seoConfig.defaultAuthor,
        publisher: {
          '@id': `${seoConfig.siteUrl}/#organization`
        },
        image: ogImage,
        keywords: tags.join(', '),
        articleSection: categories.join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl
        }
      } : type === 'podcast' ? {
        '@type': 'PodcastEpisode',
        '@id': `${pageUrl}#podcast`,
        headline: title || seoConfig.defaultTitle,
        description: metaDescription,
        url: pageUrl,
        datePublished: publishedTime,
        author: author ? {
          '@type': 'Person',
          name: author
        } : seoConfig.defaultAuthor,
        publisher: {
          '@id': `${seoConfig.siteUrl}/#organization`
        },
        image: ogImage
      } : type === 'offer' ? {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title || seoConfig.defaultTitle,
        description: metaDescription,
        isPartOf: {
          '@id': `${seoConfig.siteUrl}/#website`
        },
        about: {
          '@type': 'Thing',
          name: title
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImage
        }
      } : {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title || seoConfig.defaultTitle,
        description: metaDescription,
        isPartOf: {
          '@id': `${seoConfig.siteUrl}/#website`
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImage
        }
      },

      // 4. Breadcrumb Schema (if provided)
      ...(breadcrumbs ? [{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }] : []),

      // 5. Custom Schema (if provided)
      ...(customSchema ? [customSchema] : [])
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || seoConfig.defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:image" content={ogImage} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={title || seoConfig.defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
