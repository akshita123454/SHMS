import React, { useState } from 'react';
import { useLogin } from '../../api/auth/useLogin';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImage from '../../../public/image.png';

export default function LoginForm() {
  const { login, loading, loginPatient } = useLogin();
  const navigate = useNavigate();

  const [type, setType] = useState(''); // "patient" or "staff"
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'patient') {
        const patient = await loginPatient(form);
        toast.success('Login successful!');
        navigate('/patient');
      } else if (type === 'staff') {
        const user = await login(form);
        toast.success('Login successful!');
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
          default:
            navigate('/unauthorized');
        }
      } else {
        toast.error('Please select a valid role.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex w-full max-w-4xl">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={LoginImage}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login to SHMS</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Role Selection */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="staff">Staff</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Signup Redirect */}
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:underline"
              >
                Signup
              </button>
            </p>
            {/* Home Button */}

            {/* Forgot Password Redirect */}
            <p className="text-center text-sm mt-2">
              Forgot your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:underline"
              >
                Recover
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
