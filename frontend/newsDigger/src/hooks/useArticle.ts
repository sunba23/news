import { useState, useEffect } from 'react';
import { newsApi, type News } from '@/api';

export function useArticle(id: number) {
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const articleData = await newsApi.getNewsById(id);
        setArticle(articleData);
      } catch (err) {
        setError('Failed to fetch article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return { article, loading, error };
}