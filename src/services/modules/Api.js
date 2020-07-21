import axios from 'axios';

export default {
  generateApi() {
    const api = axios.create({
      headers: {
        baseURL: process.env.RAZZLE_RUNTIME_BASE_URL,
        'Content-Type': 'application/json',
      },
    });
    api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );
    return api;
  },
};
