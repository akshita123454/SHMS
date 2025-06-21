import React, { useState } from 'react';
import { useSignup } from '../../api/auth/useSignup';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate(); // ⬅️ add this
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
    //   alert('Signup successful!');
      navigate('/login'); // ⬅️ redirect to login after successful signup
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white space-y-4">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

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

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
        <option value="reception">Reception</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-green-600 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}

