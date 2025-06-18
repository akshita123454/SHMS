// src/pages/patient/components/MessageSection.jsx
import React, { useState } from "react";
import axios from "axios";

const MessageSection = () => {
  const [msg, setMsg] = useState({ sender: "", content: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMsg({ ...msg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/patients/messages", msg);
    setMessage("Message sent!");
    setMsg({ sender: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-info text-center translate-y-1/2 container mt-5 p-4 rounded-4 shadow-lg text-white"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        maxWidth: "500px",
      }}>
      <h2>Send Message</h2>
      <label>
        Sender:
        <input class="border border-info" name="sender" value={msg.sender} onChange={handleChange} />
      </label>
      <label>
        Message:
        <textarea class="border border-info" name="content" value={msg.content} onChange={handleChange} />
      </label>
      <button class="border border-info" type="submit">Send</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default MessageSection;