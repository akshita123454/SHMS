import { useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
