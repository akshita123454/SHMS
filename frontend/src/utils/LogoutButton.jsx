import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../api/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      logout();           // Clears auth data
      navigate('/login'); // Redirects to login
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex bg-red-600 items-center w-full p-2 rounded-lg hover:bg-gray-700 transition mt-6"
    >
      <span className="mr-2"><LogOut /></span>Logout
    </button>
  );
}
