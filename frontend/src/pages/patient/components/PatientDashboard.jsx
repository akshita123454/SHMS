import React from 'react';
import { useAuth } from '../../../api/auth/useAuth';

const PatientDashboard = ({ setSection, profileData }) => {
  const { user } = useAuth();

  if (!user) return <div className="text-center py-10 text-gray-500">Loading user data...</div>;

  const {
    name,
    email,
    phone,
    dob,
    gender,
    pronouns,
    address = {},
    bloodGroup,
    occupation,
    maritalStatus
  } = profileData || {};

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">
         Welcome, {name || user.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-800 text-sm">
        <Info label="Email" value={email || user.email} />
        <Info label="Phone" value={phone || "Not Provided"} />
        <Info label="Date of Birth" value={dob || "Not Provided"} />
        <Info label="Gender" value={gender || "Not Provided"} />
        <Info label="Pronouns" value={pronouns || "Not Provided"} />
        <Info label="Blood Group" value={bloodGroup || "Not Provided"} />
        <Info label="Occupation" value={occupation || "Not Provided"} />
        <Info label="Marital Status" value={maritalStatus || "Not Provided"} />
        <Info label="Role" value={user.role} />
        <Info
          label="Address"
          value={
            address.city || address.state || address.pinCode
              ? `${address.city || "City"}, ${address.state || "State"}, ${address.pinCode || "PIN"}`
              : "Not Provided"
          }
        />
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => setSection('profile card')}
          className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 font-medium">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default PatientDashboard;
