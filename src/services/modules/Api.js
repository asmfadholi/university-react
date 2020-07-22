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
      (error) => {
        const isExpected = error.response
        && error.response.status >= 400 && error.response.status < 500;
        if (isExpected) {
          return Promise.reject(error.response.data);
        }
        const newError = { error: true, message: 'Something went wrong' };
        return Promise.reject(newError);
      },
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
      (error) => {
        const isExpected = error.response
        && error.response.status >= 400 && error.response.status < 500;
        if (isExpected) {
          return Promise.reject(error.response.data);
        }
        const newError = { error: true, message: 'Something went wrong' };
        return Promise.reject(newError);
      },
    );
    return api;
  },
};
