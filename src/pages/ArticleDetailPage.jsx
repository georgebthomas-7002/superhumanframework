import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook, Mail, Copy, Check } from 'lucide-react';
import { loadContentBySlug, getRelatedContent } from '../utils/contentLoader';
import ResourceCard from '../components/ResourceCenter/ResourceCard';
import FAQAccordion from '../components/FAQAccordion';
import TableOfContents from '../components/TableOfContents';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo.config';
import '../styles/article.css';

const ArticleDetailPage = ({ navigate, slug }) => {
  const [article, setArticle] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load article
    const loadedArticle = loadContentBySlug(slug, 'article');
    if (loadedArticle) {
      setArticle(loadedArticle);
      setRelatedContent(getRelatedContent(loadedArticle, 3));
    }
  }, [slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';
    const text = article?.excerpt || '';

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Parse article content into sections
  const parseArticleContent = (content) => {
    if (!content) return { featuredSnippet: null, mainContent: content, faqs: [] };

    let workingContent = content;
    let featuredSnippet = null;
    let faqs = [];

    // Extract featured snippet (blockquote right after H1)
    const snippetRegex = /^#\s+.*?\n\n>\s*\*\*Featured Insight:\*\*\s*([\s\S]*?)\n\n---/m;
    const snippetMatch = workingContent.match(snippetRegex);
    if (snippetMatch) {
      featuredSnippet = snippetMatch[1].trim();
      // Remove the featured snippet section from content
      workingContent = workingContent.replace(/>\s*\*\*Featured Insight:\*\*[\s\S]*?\n\n---\n\n/, '');
    }

    // Extract FAQs
    const faqRegex = /##\s*\*?\*?Frequently Asked Questions.*?\*?\*?[\s\S]*$/i;
    const faqMatch = workingContent.match(faqRegex);

    if (faqMatch) {
      const faqSection = faqMatch[0];
      workingContent = workingContent.replace(faqRegex, '').trim();

      // Parse individual FAQ items
      const faqItemRegex = /\*\*\d+\.\s*(.*?)\*\*\s*\n\n([\s\S]*?)(?=\n\n\*\*\d+\.|\n\n##|$)/g;
      let match;

      while ((match = faqItemRegex.exec(faqSection)) !== null) {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim()
        });
      }
    }

    return { featuredSnippet, mainContent: workingContent, faqs };
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h2>
          <button
            onClick={() => navigate('resources')}
            className="text-[#f65625] font-bold hover:underline"
          >
            Back to Resource Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      {article && (
        <SEO
          title={article.title}
          description={article.excerpt}
          slug={`resource/article/${slug}`}
          type="article"
          image={article.featuredImage}
          publishedTime={article.publishDate ? new Date(article.publishDate).toISOString() : undefined}
          author={article.author || seoConfig.defaultAuthor.name}
          tags={article.tags || []}
          categories={article.categories || []}
          breadcrumbs={[
            { name: 'Home', url: seoConfig.siteUrl },
            { name: 'Resources', url: `${seoConfig.siteUrl}/resources` },
            { name: article.title, url: `${seoConfig.siteUrl}/resource/article/${slug}` }
          ]}
        />
      )}

      {/* Back Button - Cleaner design */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-6 py-5">
          <button
            onClick={() => navigate('resources')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#f65625] font-bold transition-all hover:gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Header - More spacious and clean */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Categories - Cleaner badges */}
          {article.categories && (
            <div className="flex flex-wrap gap-3 mb-8">
              {article.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-[#028393]/10 text-[#028393] rounded-lg text-sm font-bold border border-[#028393]/20"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title - Larger, more impactful */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#142d63] mb-8 leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt - Larger, more prominent */}
          {article.excerpt && (
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light">
              {article.excerpt}
            </p>
          )}

          {/* Meta Info - More spacious */}
          <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-10 pb-10 border-b-2 border-gray-200">
            {article.author && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {article.author.charAt(0)}
                </div>
                <span className="font-bold text-lg">{article.author}</span>
              </div>
            )}
            {article.publishDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#028393]" />
                <span className="font-medium">{formatDate(article.publishDate)}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f65625]" />
                <span className="font-medium">{article.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Share Buttons - More prominent */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <span className="text-base font-bold text-gray-700">Share this article:</span>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-3 bg-[#0077b5] text-white rounded-xl hover:scale-110 transition-all shadow-md hover:shadow-lg"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 bg-[#1DA1F2] text-white rounded-xl hover:scale-110 transition-all shadow-md hover:shadow-lg"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-3 bg-[#4267B2] text-white rounded-xl hover:scale-110 transition-all shadow-md hover:shadow-lg"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('email')}
              className="p-3 bg-gray-600 text-white rounded-xl hover:scale-110 transition-all shadow-md hover:shadow-lg"
              title="Share via Email"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-3 bg-[#f65625] text-white rounded-xl hover:scale-110 transition-all shadow-md hover:shadow-lg"
              title="Copy link"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Featured Snippet - More prominent */}
        {parseArticleContent(article.content).featuredSnippet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#028393] to-[#142d63] rounded-3xl p-10 mb-16 shadow-2xl border-2 border-[#028393]/30 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="flex items-start gap-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-4">Key Takeaway</h3>
                <p className="text-white/95 text-xl leading-relaxed">
                  {parseArticleContent(article.content).featuredSnippet}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table of Contents */}
        <TableOfContents content={article.content} />

        {/* Featured Image - Larger, more prominent */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Article Content - With generous margins */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="article-content prose prose-lg max-w-none mb-16
            prose-headings:scroll-mt-24
            prose-p:text-gray-700
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-8 prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:shadow-2xl"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }]
            ]}
          >
            {parseArticleContent(article.content).mainContent}
          </ReactMarkdown>
        </motion.article>

        {/* FAQ Accordion */}
        {parseArticleContent(article.content).faqs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <FAQAccordion faqs={parseArticleContent(article.content).faqs} />
          </motion.div>
        )}

        {/* Tags - More prominent */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-24 pt-10 border-t-2 border-gray-200">
            <div className="flex flex-wrap gap-3">
              <span className="text-base font-bold text-gray-700 mr-2">Related Topics:</span>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-[#f65625] hover:text-white transition-all cursor-pointer border border-gray-200 hover:border-[#f65625] shadow-sm hover:shadow-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section - More impactful */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 bg-gradient-to-br from-[#f65625] via-[#f65625] to-[#faaa68] rounded-3xl p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-6 p-5 bg-white/20 backdrop-blur-sm rounded-3xl shadow-lg">
              <span className="text-6xl">🚀</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Ready to Go Superhuman?</h3>
            <p className="text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of professionals transforming their approach with weekly insights, frameworks, and strategies from the Superhuman Framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => navigate('resources')}
                className="bg-white text-[#f65625] px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#142d63] hover:text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Explore More Resources
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-[#142d63] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#f65625] transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform border-2 border-white/30"
              >
                Learn About the Framework
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Content - More spacious and clean */}
      {relatedContent.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-white py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-4">Continue Reading</h2>
              <p className="text-xl text-gray-600">More insights to fuel your superhuman journey</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {relatedContent.map((item) => (
                <ResourceCard
                  key={item.id}
                  item={item}
                  onClick={(item) => navigate(`resource/${item.type}/${item.slug}`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
