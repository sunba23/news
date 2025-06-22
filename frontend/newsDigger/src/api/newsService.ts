import { axiosInstance } from './axiosInstance';

export interface News {
  ID: number;          // Backend uses ID (uppercase)
  Title: string;       // Backend uses Title (uppercase)
  Content: string;     // Backend uses Content (uppercase)
  Author: string;      // Backend uses Author (uppercase)
  CreatedAt: string;   // Backend uses CreatedAt (uppercase)
  Tags?: Tag[];        // Optional, might not always be present
}

export interface Tag {
  ID: number;          // Backend uses ID (uppercase)
  Name: string;        // Backend uses Name (uppercase)
}

export const newsApi = {
  getAllNews: async (): Promise<News[]> => {
    const response = await axiosInstance.get('/news');
    return response.data;
  },

  getNewsById: async (id: number): Promise<News> => {
    const response = await axiosInstance.get(`/news/${id}`);
    return response.data;
  },

  getTagsForNews: async (newsId: number): Promise<Tag[]> => {
    const response = await axiosInstance.get(`/news/${newsId}/tags`);
    return response.data;
  }
};