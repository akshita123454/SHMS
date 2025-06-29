 // src/pages/patient/components/AppointmentForm.jsx
// ✅ Updated AppointmentForm.jsx with time & reason
// === FILE: frontend/src/pages/patient/components/AppointmentForm.jsx ===
import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch active doctors on load
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/staff");
        const filtered = res.data.filter((staff) => staff.status === "Active");
        setDoctors(filtered);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients/appointments", formData); // ✅ Corrected URL
      setMessage("✅ Appointment booked successfully.");
      setFormData({ doctor: "", date: "", time: "", reason: "" });
    } catch (err) {
      setMessage("❌ Failed to book appointment.");
      console.error("Booking error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📅 Book Appointment
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Doctor Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Choose Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Choose Doctor</option>
            {doctors.map((doc) => (
              <option
                key={doc._id}
                value={`${doc.name} - ${doc.department} (${doc.role})`}
              >
                {doc.name} - {doc.department} ({doc.role})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Preferred Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Preferred Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">Reason for Visit</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Reason for visit"
            required
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Book
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-sm font-medium text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
