// src/pages/patient/components/ProfileCard.jsx
// ✅ Modified ProfileCard.jsx
// ProfileCard.jsx
import React, { useState } from "react";
import axios from "axios";

const ProfileCard = ({ onProfileSubmit, setSection }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    pronouns: "",
    profilePicture: "",
    address: { city: "", state: "", pinCode: "" },
    bloodGroup: "",
    occupation: "",
    maritalStatus: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "pinCode"].includes(name)) {
      setProfile({ ...profile, address: { ...profile.address, [name]: value } });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients", profile);
      setMessage("✅ Profile submitted!");
      onProfileSubmit(profile);
      setSection('dashboard');
    } catch (error) {
      setMessage("❌ Failed to submit profile.");
      console.error(error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
// <<<<<<< superman
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">👤 Profile Details Form</h2>
// =======

//     <div className=" bg-white p-6 rounded shadow ">
//       <h2 className="text-xl font-semibold mb-4 "> Profile</h2>

// >>>>>>> main

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded" placeholder="Enter your name" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded" placeholder="Enter your email" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded" placeholder="Enter your phone number" />
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input type="date" name="dob" value={profile.dob} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
          {profile.dob && (
            <p className="text-sm mt-1">🎂 Age: {calculateAge(profile.dob)} years</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select name="gender" value={profile.gender} onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Pronouns</label>
          <input type="text" name="pronouns" value={profile.pronouns} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" placeholder="e.g. he/him, she/her" />
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Picture URL</label>
          <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" placeholder="Paste image URL" />
        </div>

        {profile.profilePicture && (
          <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mt-2 object-cover" />
        )}

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input type="text" name="city" value={profile.address.city} onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2" placeholder="City" />
          <input type="text" name="state" value={profile.address.state} onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2" placeholder="State" />
          <input type="text" name="pinCode" value={profile.address.pinCode} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" placeholder="PIN Code" />
        </div>

        <div>
          <label className="block text-sm font-medium">Blood Group</label>
          <input type="text" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" placeholder="e.g. O+, A-, AB+" />
        </div>

        <div>
          <label className="block text-sm font-medium">Occupation</label>
          <input type="text" name="occupation" value={profile.occupation} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Marital Status</label>
          <select name="maritalStatus" value={profile.maritalStatus} onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Profile form
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
