import { axiosInstance } from './axiosInstance';

export const authApi = {
  googleLogin: () => {
    // For OAuth login, we need to redirect to the backend URL directly
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`;
  },

  googleLogout: () => {
    // For logout, we also redirect to the backend URL
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/logout`;
  }
};