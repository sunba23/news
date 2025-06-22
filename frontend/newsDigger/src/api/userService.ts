import { axiosInstance } from './axiosInstance';
import type { News, Tag } from './newsService'; 

export const userApi = {
  getFavoriteTags: async (): Promise<Tag[]> => {
    const response = await axiosInstance.get('/user/tags');
    return response.data;
  },

  addFavoriteTag: async (tagId: number): Promise<void> => {
    await axiosInstance.post(`/user/tags/${tagId}`);
  },

  removeFavoriteTag: async (tagId: number): Promise<void> => {
    await axiosInstance.delete(`/user/tags/${tagId}`);
  },

  getFavoriteNews: async (): Promise<News[]> => {
    const response = await axiosInstance.get('/user/news');
    return response.data;
  }
};