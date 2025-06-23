import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Unauthorized Access</h1>
        <p className="text-gray-700">
          You do not have permission to access this page with your current role.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
