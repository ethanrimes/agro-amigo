// API client configuration
// src/services/api.ts
import axios from 'axios';

// Set base URL and headers for your API
const api = axios.create({
  baseURL: 'http://your-api-url.com/api', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need (e.g., auth tokens)
  }
});

export default api;
