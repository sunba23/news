import { axiosInstance } from './axiosInstance';
import type { News, Tag } from './newsService';


export const tagsApi = {
  getAllTags: async (): Promise<Tag[]> => {
    const response = await axiosInstance.get('/tags');
    return response.data;
  },

  getNewsByTag: async (tagId: number): Promise<News[]> => {
    const response = await axiosInstance.get(`/tags/${tagId}/news`);
    return response.data;
  }
};