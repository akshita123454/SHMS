// src/pages/patient/components/PatientDashboard.jsx
// PatientDashboard.jsx
import React from 'react';
import { useAuth } from '../../../api/auth/useAuth';

const PatientDashboard = ({ setSection, profileData }) => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">👤 Welcome, {profileData?.name || user.name}</h2>

      <div className="space-y-2 text-sm text-gray-800">
        <p><strong>Email:</strong> {profileData?.email || user.email}</p>
        <p><strong>Phone:</strong> {profileData?.phone || "Not Provided"}</p>
        <p><strong>DOB:</strong> {profileData?.dob || "Not Provided"}</p>
        <p><strong>Gender:</strong> {profileData?.gender || "Not Provided"}</p>
        <p><strong>Pronouns:</strong> {profileData?.pronouns || "Not Provided"}</p>
        <p><strong>Address:</strong> {profileData?.address?.city || "City"}, {profileData?.address?.state || "State"}, {profileData?.address?.pinCode || "PIN"}</p>
        <p><strong>Blood Group:</strong> {profileData?.bloodGroup || "Not Provided"}</p>
        <p><strong>Occupation:</strong> {profileData?.occupation || "Not Provided"}</p>
        <p><strong>Marital Status:</strong> {profileData?.maritalStatus || "Not Provided"}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setSection('profile card')}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
