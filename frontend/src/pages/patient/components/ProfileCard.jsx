// src/pages/patient/components/ProfileCard.jsx
import React, { useState } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients", profile);
      setMessage("✅ Profile submitted!");
      setProfile({ name: "", email: "", phone: "" });
    } catch (error) {
      setMessage("❌ Failed to submit profile.");
      console.error(error);
    }
  };

  return (
    <div className=" bg-white p-6 rounded shadow ">
      <h2 className="text-xl font-semibold mb-4 "> Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your phone number"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Profile
        </button>
      </form>

      {message && (
        <div className="mt-4 text-sm font-medium text-green-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
