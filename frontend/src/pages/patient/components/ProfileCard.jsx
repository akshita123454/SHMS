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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📝 Patient Profile Form</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Input label="Name" name="name" value={profile.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={profile.email} onChange={handleChange} required />
        <Input label="Phone" name="phone" type="tel" value={profile.phone} onChange={handleChange} required />
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {profile.dob && (
            <p className="text-sm text-gray-600 mt-1">🎂 Age: {calculateAge(profile.dob)} years</p>
          )}
        </div>

        <Select
          label="Gender"
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />

        <Input label="Pronouns" name="pronouns" value={profile.pronouns} onChange={handleChange} placeholder="e.g. he/him" />
        <Input label="Profile Picture URL" name="profilePicture" value={profile.profilePicture} onChange={handleChange} />

        {profile.profilePicture && (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <img
              src={profile.profilePicture}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-full border shadow"
            />
          </div>
        )}

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input name="city" placeholder="City" value={profile.address.city} onChange={handleChange} />
            <Input name="state" placeholder="State" value={profile.address.state} onChange={handleChange} />
            <Input name="pinCode" placeholder="PIN Code" value={profile.address.pinCode} onChange={handleChange} />
          </div>
        </div>

        <Input label="Blood Group" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} placeholder="e.g. O+, AB-" />
        <Input label="Occupation" name="occupation" value={profile.occupation} onChange={handleChange} />
        <Select
          label="Marital Status"
          name="maritalStatus"
          value={profile.maritalStatus}
          onChange={handleChange}
          options={["Single", "Married", "Divorced"]}
        />

        <div className="col-span-1 md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            🚀 Submit Profile
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm font-medium text-green-700">
          {message}
        </div>
      )}
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder = "", required }) => (
  <div>
    {label && <label className="block text-sm font-medium">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border px-3 py-2 rounded mt-1"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options = [] }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded mt-1"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default ProfileCard;
