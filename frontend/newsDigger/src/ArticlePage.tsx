import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleContent } from "@/components/ArticleContent";
import { useParams } from 'react-router-dom';
import { useArticle } from '@/hooks/useArticle';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '0', 10);
  const { article, loading, error } = useArticle(articleId);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1 items-center justify-center p-6">
            <div className="text-lg">Loading article...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1 items-center justify-center p-6">
            <div className="text-lg text-red-600">{error || 'Article not found'}</div>
          </main>
        </div>
      </div>
    );
  }

  // Use correct backend field names (capitalized)
  const articleData = {
    title: article.Title,
    tags: article.Tags ? article.Tags.map(tag => tag.Name) : [],
    fullText: article.Content,
    publishedDate: `Published ${new Date(article.CreatedAt).toLocaleDateString()}`,
    gradient: "from-pink-500 to-purple-600",
    sourceUrl: "#" // You might want to add a URL field to your News interface
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center p-6">
          <ArticleContent {...articleData} />
        </main>
      </div> 
    </div>
  );
}