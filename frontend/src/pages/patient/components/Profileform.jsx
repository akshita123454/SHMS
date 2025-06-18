import React, { useState } from "react";
import axios from "axios";

const ProfileForm = () => {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/patients", profile);
    setMessage("Profile submitted!");
    setProfile({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-info text-center translate-y-1/2 container mt-5 p-4 rounded-4 shadow-lg text-white"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        maxWidth: "500px",
      }}>
      <h2>Profile</h2>
      <label>
        Name:
        <input class="border border-danger-subtle" name="name" value={profile.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input class="border border-danger-subtle" name="email" value={profile.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input class="border border-danger-subtle" name="phone" value={profile.phone} onChange={handleChange} required />
      </label>
      <button class="border border-danger-subtle" type="submit">Submit</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default ProfileForm;