import axios from 'axios';

// Get API URL based on environment
const getApiUrl = () => {
  if (import.meta.env.PROD) {
    // Production: Use environment variable or fallback
    return import.meta.env.VITE_API_URL || 'https://your-railway-app.up.railway.app/api';
  }
  // Development: Use local backend
  return import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
};

const baseURL = getApiUrl();

const apiClient = axios.create({
  baseURL,
  timeout: 30000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
  // Retry configuration
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  },
  // Custom timeout handling
  timeoutErrorMessage: 'Request timed out. Please try again.',
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const collegeId = localStorage.getItem('collegeId');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (collegeId) {
      config.headers['X-College-Id'] = collegeId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle retries for specific errors
    if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
      originalRequest._retry = true;
      return apiClient(originalRequest);
    }

    // Handle network errors with retry
    if (error.message === 'Network Error' && !originalRequest._retry) {
      originalRequest._retry = true;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(apiClient(originalRequest));
        }, 1000);
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth state and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('collegeId');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden (Permission denied)
    if (error.response?.status === 403) {
      // Navigate to unauthorized page or show permission denied message
      console.error('Permission denied:', error.response.data.message);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.response.data.message);
    }

    // Handle 422 Validation Error
    if (error.response?.status === 422) {
      console.error('Validation error:', error.response.data.errors);
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data.message);
    }

    // Enhance error object with custom properties
    const enhancedError = {
      ...error,
      isApiError: true,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      validationErrors: error.response?.data?.errors,
      timestamp: new Date().toISOString()
    };

    return Promise.reject(enhancedError);
  }
);

export default apiClient;
