import { useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
          // ✅ Save only email and role to localStorage
      localStorage.setItem("user", JSON.stringify({
      _id: response.data._id, // or email
      email: response.data.email,
      role: response.data.role,
      name: response.data.name
  }));

      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const loginPatient = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/loginPatient`, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
          // ✅ Save only email and role to localStorage
      localStorage.setItem("user", JSON.stringify({
      _id: response.data._id, // or email
      email: response.data.email,
      role: response.data.role,
      name: response.data.name
  }));

      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login,loginPatient, loading, error };
};
