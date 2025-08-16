// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Your Spring Boot backend URL

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: automatically attach JWT token to outgoing requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt_token'); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error); // Propagate request errors
  }
);

// Response interceptor: handle global errors like 401 (Unauthorized) or 403 (Forbidden)
api.interceptors.response.use(
  response => response, // If response is successful, just return it
  error => {
    // Check for 401 or 403 status codes
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Authentication/Authorization error: ", error.response);
      // Log out the user by clearing local storage
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
      // Force a page reload to trigger AuthContext re-evaluation and redirection to login
      window.location.href = '/login';
    }
    return Promise.reject(error); // Propagate other errors
  }
);

export default api; // Export the configured Axios instance