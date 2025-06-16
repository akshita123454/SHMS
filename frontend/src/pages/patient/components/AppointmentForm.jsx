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
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <label>
        Doctor:
        <input name="doctor" value={appointment.doctor} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={appointment.date} onChange={handleChange} />
      </label>
      <button type="submit">Book</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default AppointmentForm;