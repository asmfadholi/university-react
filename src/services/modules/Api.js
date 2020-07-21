import axios from 'axios';

export default {
  generateApi() {
    const api = axios.create({
      headers: {
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
