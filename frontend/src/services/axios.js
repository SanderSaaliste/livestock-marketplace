import axios from 'axios';
import { apiHost } from '../constants';
import toast from 'react-hot-toast';

axios.defaults.baseURL = apiHost;

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  if (accessToken) {
    config.headers['access-token'] = accessToken;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    if (accessToken) {
      localStorage.setItem('access-token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refresh-token', refreshToken);
    }

    return response;
  },
  (error) => {
    if (!error.response) {
      console.error('Network error:', error);
      toast.error('Something went wrong. Please try again!');
    } else if (
      error.response.status === 401 &&
      window.location.pathname !== '/'
    ) {
      toast.error('Session expired. Please log in again.');

      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        window.location = '/';
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
