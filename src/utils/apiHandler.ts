/* eslint-disable max-len */
import axios from 'axios';

const baseURL = 'https://api.finmindtrade.com/api/v4/';

const localStorageToken = localStorage.getItem('localToken');
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorageToken,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return error.response.data;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
