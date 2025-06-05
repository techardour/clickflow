import { useState } from 'react';
import { auth } from '../utils/api';
import type { LoginResponse } from '../utils/types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await auth.login(username, password);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};