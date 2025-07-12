import React, { useState, useEffect } from "react";

const DoctorChat = () => {
  const dummyPatients = [
    { _id: "1", name: "Sourabh Kumar", condition: "Hypertension" },
    { _id: "2", name: "Aditi Sharma", condition: "Skin Allergy" },
    { _id: "3", name: "Rohan Verma", condition: "Migraine" },
  ];

  const dummyMessages = {
    "Sourabh Kumar": [
      {
        sender: "Sourabh Kumar",
        content: "I'm running low on medication.",
        time: "July 10, 2025 10:00 AM",
      },
      {
        sender: "You",
        content: "Okay, I'll re-prescribe it.",
        time: "July 10, 2025 10:05 AM",
      },
      {
        sender: "You",
        content: "kak",
        time: "12 Jul 2025, 11:42 am",
      },
      {
        sender: "You",
        content: "ki hal chal",
        time: "12 Jul 2025, 11:43 am",
      },
    ],
    "Aditi Sharma": [
      {
        sender: "You",
        content: "Have you been applying the cream twice a day?",
        time: "July 9, 2025 08:00 AM",
      },
      {
        sender: "Aditi Sharma",
        content: "Yes, and it’s working!",
        time: "July 9, 2025 08:10 AM",
      },
    ],
    "Rohan Verma": [],
  };

  const [patients] = useState(dummyPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState({ content: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPatient) {
      setMessages(dummyMessages[selectedPatient.name] || []);
    }
  }, [selectedPatient]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedPatient || !msg.content.trim()) return;

    const newMessage = {
      sender: "You",
      content: msg.content.trim(),
      time: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMsg({ content: "" });
    setMessage("✅ Message sent!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg shadow-lg h-[75vh] overflow-hidden">
      {/* Left: Patient List */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">Patients</h2>
        <ul className="space-y-2">
          {patients.map((patient) => (
            <li
              key={patient._id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-3 rounded-lg cursor-pointer border hover:bg-blue-50 ${
                selectedPatient?.name === patient.name
                  ? "bg-blue-100 border-blue-400"
                  : "border-gray-200"
              }`}
            >
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.condition}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Chat Section */}
      <div className="col-span-2 bg-white rounded-xl shadow-md p-4 flex flex-col h-full overflow-hidden">
        {selectedPatient ? (
          <>
            {/* Chat Header */}
            <div className="flex justify-between items-center mb-2 border-b pb-2">
              <h2 className="text-xl font-semibold text-blue-700">
                Chat with {selectedPatient.name}
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No messages yet.</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[70%] shadow ${
                      msg.sender === "You"
                        ? "ml-auto bg-blue-100 text-right"
                        : "mr-auto bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">{msg.sender}</p>
                    <p className="text-base">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="mt-3">
              <textarea
                name="content"
                value={msg.content}
                onChange={(e) => setMsg({ content: e.target.value })}
                className="w-full border px-3 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={2}
                placeholder="Type your message..."
                required
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
            </form>

            {/* Message Status */}
            {message && (
              <div
                className={`mt-2 text-sm font-medium text-center ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500 text-center my-auto">
            Select a patient from the left to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorChat;
