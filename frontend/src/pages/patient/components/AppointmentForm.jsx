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
      await axios.post("http://localhost:3000/api/patients/appointments", formData);
      setMessage("✅ Appointment booked successfully.");
      setFormData({ doctor: "", date: "", time: "", reason: "" });
    } catch (err) {
      setMessage("❌ Failed to book appointment.");
      console.error("Booking error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        Book an Appointment
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Doctor Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Choose Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Doctor</option>
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
        <Input
          label="Preferred Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        {/* Time */}
        <Input
          label="Preferred Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
        />

        {/* Reason */}
        <Textarea
          label="Reason for Visit"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Describe your symptoms or concern"
        />

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition"
          >
            🚀 Book Appointment
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-6 text-sm font-semibold text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      placeholder={placeholder}
      className="w-full border px-3 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    ></textarea>
  </div>
);

export default AppointmentForm;
