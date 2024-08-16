import axios from "axios";
import authService from './auth.service';

axios.defaults.baseURL = "http://localhost:3000/api";

const setAuthHeader = () => {
  const token = authService.getJwt();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Call this function before each request
axios.interceptors.request.use((config) => {
  setAuthHeader();
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log('intercept', error);
    if (error.response && error.response.status === 401) {
      // Unauthorized, clear the token and redirect to login
      authService.logout();
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};