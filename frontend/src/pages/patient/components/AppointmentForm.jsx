 // src/pages/patient/components/AppointmentForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({ doctor: "", date: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients/appointments", appointment);
      setMessage("✅ Appointment booked!");
      setAppointment({ doctor: "", date: "" });
    } catch (error) {
      setMessage("❌ Failed to book appointment.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📅 Book Appointment
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Doctor select */}
        <div>
          <label className="block text-sm font-medium mb-1">Choose Doctor</label>
          <select
            name="doctor"
            value={appointment.doctor}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
          </select>
        </div>

        {/* Date input */}
        <div>
          <label className="block text-sm font-medium mb-1">Preferred Date</label>
          <input
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Book
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-sm font-medium text-center text-green-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
