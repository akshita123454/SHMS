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
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <label>
        Name:
        <input name="name" value={profile.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input name="email" value={profile.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input name="phone" value={profile.phone} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default ProfileForm;