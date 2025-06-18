// src/pages/patient/components/ProfileCard.jsx
import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">👤 Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" defaultValue="Jane Doe" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" defaultValue="jane.doe@example.com" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="tel" defaultValue="+1234567890" className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
