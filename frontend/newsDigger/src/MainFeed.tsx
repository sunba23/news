import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleCard } from "@/components/ArticleCard";
import { useNews } from '@/hooks/useNews';
import { useState, useEffect } from 'react';

// Gradient colors for visual variety
const gradients = [
  "from-pink-500 to-purple-600",
  "from-blue-500 to-teal-400",
  "from-orange-500 to-yellow-400",
  "from-sky-400 to-cyan-300",
  "from-green-400 to-lime-300",
  "from-indigo-500 to-violet-500"
];

export default function FeedPage() {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-lg">Loading news...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-lg text-red-600">{error}</div>
          </main>
        </div>
      </div>
    );
  }

  // Add debugging
  console.log('News data:', news);

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(news) && news.map((article, index) => {
              // Use correct backend field names (capitalized)
              const title = article?.Title || 'No title available';
              const content = article?.Content || '';
              const description = content.length > 150 ? content.substring(0, 150) + "..." : content;
              const tags = Array.isArray(article?.Tags) ? article.Tags.map(tag => tag?.Name || 'Unknown').filter(Boolean) : [];
              const publishedDate = article?.CreatedAt ? new Date(article.CreatedAt).toLocaleDateString() : 'Unknown date';
              
              return (
                <ArticleCard 
                  key={article?.ID || index} 
                  id={article?.ID || index}
                  title={title}
                  description={description || 'No description available'}
                  tags={tags}
                  publishedDate={publishedDate}
                  gradient={gradients[index % gradients.length]}
                />
              );
            })} 
          </div>
          {!Array.isArray(news) && (
            <div className="text-center p-6">
              <p className="text-gray-500">No news articles available</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}