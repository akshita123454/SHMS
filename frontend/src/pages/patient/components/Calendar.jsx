// src/pages/patient/components/Calender.jsx
// src/pages/patient/components/MyCalendar.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/patients/all-appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const selected = date.toISOString().split("T")[0];
    const filtered = appointments.filter((appt) => {
      if (!appt.date) return false;
      const apptDate = new Date(appt.date);
      if (isNaN(apptDate)) return false;
      return apptDate.toISOString().split("T")[0] === selected;
    });
    setFilteredAppointments(filtered);
  }, [date, appointments]);

  return (
    <div className="flex gap-6 p-6">
      {/* Calendar Left */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold mb-4">📅 Your Calendar</h2>
        <Calendar onChange={setDate} value={date} />
        <p className="mt-4 text-gray-600">
          Selected date: <strong>{date.toDateString()}</strong>
        </p>
      </div>

      {/* Appointment List Right */}
      <div className="flex-1 bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Appointments on {date.toDateString()}</h3>
        {filteredAppointments.length > 0 ? (
          <ul className="space-y-3">
            {filteredAppointments.map((appt, idx) => (
              <li key={idx} className="border p-3 rounded">
                <div><strong>Doctor:</strong> {appt.doctor}</div>
                <div><strong>Time:</strong> {appt.time}</div>
                <div><strong>Reason:</strong> {appt.reason}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No appointments found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
