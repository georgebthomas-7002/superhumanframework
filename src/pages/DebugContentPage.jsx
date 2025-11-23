import React, { useState, useEffect } from 'react';
import { loadAllContent } from '../utils/contentLoader';

const DebugContentPage = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const loaded = loadAllContent();
      setContent(loaded);
      console.log('DEBUG: Loaded content:', loaded);
    } catch (err) {
      setError(err.message);
      console.error('DEBUG: Error loading content:', err);
    }
  }, []);

  const byType = content.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || []).concat(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Loader Debug</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded mb-8">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <p className="mb-2"><strong>Total items loaded:</strong> {content.length}</p>
          <p className="mb-2"><strong>Articles:</strong> {byType.article?.length || 0}</p>
          <p className="mb-2"><strong>Podcasts:</strong> {byType.podcast?.length || 0}</p>
          <p className="mb-2"><strong>Offers:</strong> {byType.offer?.length || 0}</p>
        </div>

        {Object.entries(byType).map(([type, items]) => (
          <div key={type} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 capitalize">{type}s ({items.length})</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-300 p-4 rounded">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Slug:</strong> {item.slug}</p>
                    <p><strong>Type:</strong> {item.type}</p>
                    <p><strong>Published:</strong> {item.publishDate}</p>
                    {item.categories && (
                      <p><strong>Categories:</strong> {item.categories.join(', ')}</p>
                    )}
                    {item.tags && (
                      <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
                    )}
                    {item.excerpt && (
                      <p className="mt-2"><strong>Excerpt:</strong> {item.excerpt.substring(0, 100)}...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugContentPage;
