import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, Share2, Linkedin, Twitter, Facebook, Mail, Copy, Check, Play, Headphones } from 'lucide-react';
import { loadContentBySlug, getRelatedContent } from '../utils/contentLoader';
import ResourceCard from '../components/ResourceCenter/ResourceCard';

const PodcastDetailPage = ({ navigate, slug }) => {
  const [podcast, setPodcast] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load podcast
    const loadedPodcast = loadContentBySlug(slug, 'podcast');
    if (loadedPodcast) {
      setPodcast(loadedPodcast);
      setRelatedContent(getRelatedContent(loadedPodcast, 3));
    }
  }, [slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = podcast?.title || '';
    const text = podcast?.description || '';

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

  if (!podcast) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Podcast not found</h2>
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

      {/* Podcast Header */}
      <div className="bg-gradient-to-br from-[#f65625] to-[#faaa68] text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Podcast Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Headphones className="w-5 h-5" />
              <span className="font-bold">PODCAST EPISODE</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {podcast.title}
            </h1>

            {/* Description */}
            {podcast.description && (
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {podcast.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
              {podcast.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(podcast.publishDate)}</span>
                </div>
              )}
              {podcast.duration && (
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>{podcast.duration}</span>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold mr-2">Share:</span>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('email')}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                title="Share via Email"
              >
                <Mail className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                title="Copy link"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Audio Player / Embed */}
        {(podcast.audioUrl || podcast.embedCode) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-gray-50 rounded-2xl p-8 border-2 border-gray-200"
          >
            {podcast.embedCode ? (
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: podcast.embedCode }}
              />
            ) : podcast.audioUrl ? (
              <audio controls className="w-full">
                <source src={podcast.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </motion.div>
        )}

        {/* Categories */}
        {podcast.categories && (
          <div className="flex flex-wrap gap-2 mb-8">
            {podcast.categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#f65625]/10 text-[#f65625] rounded-full text-sm font-bold"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {podcast.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={podcast.coverImage}
              alt={podcast.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Show Notes / Content */}
        {podcast.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#142d63] mb-6">Show Notes</h2>
            <article
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
                prose-img:rounded-xl prose-img:shadow-lg"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {podcast.content}
              </ReactMarkdown>
            </article>
          </motion.div>
        )}

        {/* Tags */}
        {podcast.tags && podcast.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-bold text-gray-600 mr-2">Tags:</span>
              {podcast.tags.map((tag, index) => (
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

        {/* Subscribe CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#142d63] to-[#028393] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Never Miss an Episode</h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Subscribe to get notified when new podcast episodes are released.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-[#142d63] px-6 py-3 rounded-full font-bold hover:bg-[#f65625] hover:text-white transition-colors shadow-lg">
              Subscribe on Apple Podcasts
            </button>
            <button className="bg-white text-[#142d63] px-6 py-3 rounded-full font-bold hover:bg-[#f65625] hover:text-white transition-colors shadow-lg">
              Subscribe on Spotify
            </button>
          </div>
        </div>
      </div>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-[#142d63] mb-8">More Episodes</h2>
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

export default PodcastDetailPage;
