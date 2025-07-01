// src/pages/patient/components/MessageSection.jsx
import React, { useState } from "react";
import axios from "axios";

const MessageSection = () => {
  const [msg, setMsg] = useState({ sender: "", content: "" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Dr. Sanju Samson",
      content: "Please remember to take your medication.",
      time: "May 15, 2025 09:00 AM",
    },
    {
      sender: "You",
      content: "Thank you!",
      time: "May 15, 2025 09:05 AM",
    },
  ]);

  const handleChange = (e) => {
    setMsg({ ...msg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients/messages", msg);

      const newMessage = {
        sender: "You",
        content: msg.content,
        time: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      setMessages([...messages, newMessage]);
      setMessage("✅ Message sent!");
      setMsg({ sender: "", content: "" });
    } catch (error) {
      setMessage("❌ Failed to send message.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow ">
      <h2 className="text-xl font-semibold mb-3 "> Messages</h2>

      <div className="max-h-64 overflow-y-auto pr-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">
              {msg.sender === "You" ? "You" : `Dr. ${msg.sender}`}:
            </p>
            <p>{msg.content}</p>
            <p className="text-sm text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="sender"
          value={msg.sender}
          onChange={handleChange}
          placeholder="Choose Docter"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="content"
          value={msg.content}
          onChange={handleChange}
          placeholder="Type a message..."
          required
          className="w-full border px-3 py-2 rounded resize-none"
          rows={2}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </form>

      {message && (
        <div className="mt-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default MessageSection;
