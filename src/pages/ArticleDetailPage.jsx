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

      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate('resources')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#f65625] font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Resource Center
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Categories */}
          {article.categories && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#028393]/10 text-[#028393] rounded-full text-sm font-bold"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-full flex items-center justify-center text-white font-bold">
                  {article.author.charAt(0)}
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
            )}
            {article.publishDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm font-bold text-gray-600 mr-2">Share:</span>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 bg-[#0077b5] text-white rounded-full hover:scale-110 transition-transform"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition-transform"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 bg-[#4267B2] text-white rounded-full hover:scale-110 transition-transform"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('email')}
              className="p-2 bg-gray-600 text-white rounded-full hover:scale-110 transition-transform"
              title="Share via Email"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 bg-[#f65625] text-white rounded-full hover:scale-110 transition-transform"
              title="Copy link"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Featured Snippet */}
        {parseArticleContent(article.content).featuredSnippet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#028393] to-[#142d63] rounded-2xl p-8 mb-12 shadow-xl border-2 border-[#028393]/30"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Key Takeaway</h3>
                <p className="text-white/95 text-lg leading-relaxed">
                  {parseArticleContent(article.content).featuredSnippet}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table of Contents */}
        <TableOfContents content={article.content} />

        {/* Featured Image */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="article-content prose prose-xl max-w-none
            prose-headings:text-[#142d63] prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
            prose-h1:text-5xl prose-h1:leading-tight prose-h1:mb-10 prose-h1:font-black
            prose-h2:text-4xl prose-h2:leading-tight prose-h2:mt-20 prose-h2:mb-10 prose-h2:font-black prose-h2:pb-6
            prose-h2:bg-gradient-to-r prose-h2:from-[#142d63] prose-h2:to-[#028393] prose-h2:bg-clip-text prose-h2:text-transparent
            prose-h2:border-b-[6px] prose-h2:border-[#f65625]
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-extrabold prose-h3:text-[#142d63]
            prose-h3:pl-6 prose-h3:border-l-4 prose-h3:border-[#028393]
            prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-5 prose-h4:font-bold prose-h4:text-[#028393] prose-h4:uppercase prose-h4:tracking-wide prose-h4:text-sm
            prose-p:text-gray-800 prose-p:text-xl prose-p:leading-[1.8] prose-p:mb-8 prose-p:font-normal
            prose-p:first-of-type:text-2xl prose-p:first-of-type:leading-[1.6] prose-p:first-of-type:font-medium prose-p:first-of-type:text-gray-900
            prose-a:text-[#f65625] prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-[#f65625]/30 hover:prose-a:border-[#f65625] prose-a:transition-all prose-a:pb-0.5
            prose-strong:text-[#142d63] prose-strong:font-extrabold prose-strong:bg-[#f65625]/5 prose-strong:px-1 prose-strong:py-0.5 prose-strong:rounded
            prose-em:text-gray-900 prose-em:italic prose-em:font-medium
            prose-ul:my-10 prose-ul:space-y-4 prose-ul:pl-0
            prose-ol:my-10 prose-ol:space-y-4 prose-ol:pl-0
            prose-li:text-gray-800 prose-li:text-xl prose-li:leading-[1.8] prose-li:pl-8 prose-li:relative
            prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-[#f65625] prose-li:before:font-bold prose-li:before:text-2xl
            prose-blockquote:not-italic prose-blockquote:border-l-[6px] prose-blockquote:border-[#f65625]
            prose-blockquote:bg-gradient-to-r prose-blockquote:from-[#f65625]/8 prose-blockquote:via-[#f65625]/4 prose-blockquote:to-transparent
            prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:my-12 prose-blockquote:rounded-2xl prose-blockquote:shadow-lg
            prose-blockquote:text-2xl prose-blockquote:font-bold prose-blockquote:text-[#142d63] prose-blockquote:leading-[1.5]
            prose-code:text-[#028393] prose-code:bg-[#028393]/10 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:font-mono prose-code:text-lg prose-code:font-semibold
            prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:p-8 prose-pre:my-12
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-16 prose-img:border-4 prose-img:border-gray-100
            prose-hr:border-0 prose-hr:h-1 prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-[#028393]/30 prose-hr:to-transparent prose-hr:my-16"
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

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-bold text-gray-600 mr-2">Tags:</span>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-[#f65625] via-[#f65625] to-[#faaa68] rounded-3xl p-12 text-center text-white shadow-2xl border-2 border-[#f65625]/30 relative overflow-hidden"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-4 p-4 bg-white/20 rounded-2xl">
              <span className="text-5xl">🚀</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Go Superhuman?</h3>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals transforming their approach with weekly insights, frameworks, and strategies from the Superhuman Framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('resources')}
                className="bg-white text-[#f65625] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#142d63] hover:text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Explore More Resources
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-[#142d63] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#f65625] transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform border-2 border-white/30"
              >
                Learn About the Framework
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-[#142d63] mb-8">Related Content</h2>
            <div className="grid md:grid-cols-3 gap-8">
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
