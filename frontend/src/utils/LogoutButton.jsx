import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../api/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ collapsed = false, className = '' }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      setLoggingOut(true);
      logout();
    }
  };

  useEffect(() => {
    if (loggingOut && !user) {
      navigate('/login');
    }
  }, [user, loggingOut, navigate]);

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center w-full px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition ${
        collapsed ? 'justify-center' : 'gap-2'
      } ${className}`}
    >
      <LogOut className="w-5 h-5" />
      {!collapsed && <span>Logout</span>}
    </button>
  );
}
