import React, { useState } from 'react';
import { useLogin } from '../../api/auth/useLogin';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form); // <- this must return user object with role
    //   alert('Login successful!');

      // ✅ Redirect based on role
      switch (user.role) {
        case 'doctor':
          navigate('/doctor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'reception':
          navigate('/reception');
          break;
        case 'emergency':
          navigate('/emergency');
          break;
        case 'patient':
          navigate('/patient');
          break;
        default:
          navigate('/unauthorized');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-center text-sm mt-4">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-blue-600 hover:underline"
        >
          Signup
        </button>
      </p>
    </form>
  );
}

