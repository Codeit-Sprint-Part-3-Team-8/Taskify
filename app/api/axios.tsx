import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const key = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || null;
      if (key) {
        const token = localStorage.getItem(key);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
