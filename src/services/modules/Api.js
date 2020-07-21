import axios from 'axios';

export default {
  generateApi() {
    const api = axios.create({
      baseURL: process.env.RAZZLE_RUNTIME_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    api.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error),
    );
    return api;
  },
  generateApiLocal() {
    const api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
    api.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error),
    );
    return api;
  },
};
