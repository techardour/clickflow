import axios from 'axios';
import { config } from './config';
import { storage } from './storage';
import type { LoginRequest, LoginResponse } from './types';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  withCredentials: false
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          storage.removeToken();
          // Handle unauthorized
          break;
        case 403:
          // Handle forbidden
          break;
        case 500:
          // Handle server error
          break;
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const data: LoginRequest = {
      loginType: config.LOGIN_TYPE,
      username,
      password,
      appId: config.APP_ID,
      appVersion: config.APP_VERSION
    };

    try {
      const response = await api.post('/auth/login', data);
      if (response.data.token) {
        storage.setToken(response.data.token);
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Authentication failed');
      }
      throw new Error('Network error occurred');
    }
  }
};