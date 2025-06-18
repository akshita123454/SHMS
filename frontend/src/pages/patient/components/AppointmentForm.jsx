 // src/pages/patient/components/AppointmentForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({ doctor: "", date: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/patients/appointments", appointment);
    setMessage("Appointment booked!");
    setAppointment({ doctor: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-info text-center translate-y-1/2 container mt-5 p-4 rounded-4 shadow-lg text-white"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        maxWidth: "500px",
      }}>
     
      <h2>Book Appointment</h2>
      <label>
        Doctor:
        <input class="border border-info" name="doctor" value={appointment.doctor} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input class="border border-info" type="date" name="date" value={appointment.date} onChange={handleChange} />
      </label>
      <button class="border border-info" type="submit">Book</button>
      {message && <div>{message}</div>}
     
    </form>
    
  );
};

export default AppointmentForm;