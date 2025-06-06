import axios from 'axios';
import { config } from './config';
import { storage } from './storage';
import type { LoginRequest, LoginResponse, DocumentResponse } from './types';

// Create auth API instance
const authApi = axios.create({
  baseURL: config.AUTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  withCredentials: false
});

// Create document API instance
const documentApiInstance = axios.create({
  baseURL: config.DOCUMENT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  withCredentials: false
});

// Create credit engine API instance
const creditEngineApiInstance = axios.create({
  baseURL: config.CREDIT_ENGINE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Configure request interceptors
[authApi, documentApiInstance, creditEngineApiInstance].forEach(api => {
  api.interceptors.request.use(config => {
    const token = storage.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => {
      // Handle axios errors
      if (error.response) {
        switch (error.response.status) {
          case 401:
            storage.removeToken();
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
});

export const auth = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const data: LoginRequest = {
      loginType: config.LOGIN_TYPE,
      username,
      password,
      appId: config.APP_ID,
      appVersion: config.APP_VERSION
    };

    try {
      const response = await authApi.post<LoginResponse>('/auth/login', data);
      if (response.data.accessToken) {
        storage.setToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Authentication failed');
      }
      throw new Error('Network error occurred');
    }
  }
};

export const documentApi = {
  fetchPdf: async (documentId: string): Promise<string> => {
    try {
      const response = await documentApiInstance.get<DocumentResponse>('/v3/file', {
        params: { documentId },
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
        }
      });
      return response.data.documentUrl;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to fetch document URL');
      }
      throw new Error('Network error occurred');
    }
  }
};

export const kfsApi = {
  submitConsent: async (loanId: string): Promise<void> => {
    try {
      await creditEngineApiInstance.put('/kfs/customer-consent', null, {
        params: { loanId }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to submit KFS consent');
      }
      throw new Error('Network error occurred');
    }
  }
};