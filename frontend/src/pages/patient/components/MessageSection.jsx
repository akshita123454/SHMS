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
    <form onSubmit={handleSubmit}>
      <h2>Send Message</h2>
      <label>
        Sender:
        <input name="sender" value={msg.sender} onChange={handleChange} />
      </label>
      <label>
        Message:
        <textarea name="content" value={msg.content} onChange={handleChange} />
      </label>
      <button type="submit">Send</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default MessageSection;