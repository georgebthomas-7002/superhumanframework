import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook, Mail, Copy, Check } from 'lucide-react';
import { loadContentBySlug, getRelatedContent } from '../utils/contentLoader';
import ResourceCard from '../components/ResourceCenter/ResourceCard';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo.config';

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

        {/* Featured Image */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none
            prose-headings:text-[#142d63] prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#f65625] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#142d63] prose-strong:font-bold
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-gray-700 prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-[#f65625] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8
            prose-code:text-[#028393] prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-img:rounded-xl prose-img:shadow-lg"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </motion.article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
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
        <div className="mt-12 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Go Superhuman?</h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Get weekly insights, frameworks, and strategies delivered to your inbox.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-[#f65625] px-8 py-3 rounded-full font-bold hover:bg-[#142d63] hover:text-white transition-colors shadow-lg"
          >
            Explore More Resources
          </button>
        </div>
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
