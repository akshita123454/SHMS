// src/pages/patient/components/MessageSection.jsx
import React from "react";

const MessageSection = () => {
  const messages = [
    {
      sender: "Dr. Sanju Samson",
      message: "Please remember to take your medication.",
      time: "May 15, 2025 09:00 AM",
    },
    {
      sender: "You",
      message: "Thank you!",
      time: "May 15, 2025 09:05 AM",
    },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">💬 Messages</h2>
      <div className="max-h-64 overflow-y-auto pr-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">{msg.sender === "You" ? "You" : `Dr. ${msg.sender}`}:</p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <textarea
          placeholder="Type a message..."
          className="w-full border px-3 py-2 rounded resize-none"
          rows={2}
        ></textarea>
      </div>
      <button className="mt-2 bg-blue-600 text-white w-full py-2 rounded">Send</button>
    </div>
  );
};

export default MessageSection;
