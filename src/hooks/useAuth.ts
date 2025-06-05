import { useState } from 'react';
import { authApi } from '../utils/api';
import type { LoginResponse } from '../utils/types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(username, password);
      // You might want to store the token in localStorage or a state management solution
      localStorage.setItem('token', response.accessToken || '');
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};