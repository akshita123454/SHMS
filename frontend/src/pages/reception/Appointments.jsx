// src/pages/reception/Appointments.jsx
import React, { useEffect, useState } from 'react';
import {
  bookAppointment,
  getAllAppointments,
  cancelAppointment,
} from '../../api/reception/appointments';

import { CalendarPlus } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 🔁 Load appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('❌ Failed to fetch appointments:', err);
    }
  };

  const handleBook = async () => {
    if (!name || !date || !time) return;
    const newAppointment = { name, date, time };
    try {
      await bookAppointment(newAppointment);
      await fetchAppointments(); // Refresh after adding
      setName('');
      setDate('');
      setTime('');
    } catch (err) {
      console.error('❌ Failed to book appointment:', err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      await fetchAppointments();
    } catch (err) {
      console.error('❌ Failed to cancel appointment:', err);
    }
  };

  const filteredAppointments = appointments.filter((appt) =>
    appt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-4xl mx-auto bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <CalendarPlus className="w-6 h-6" />
        Manage Appointments
      </h2>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleBook}
          className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700"
        >
          Book Appointment
        </button>
      </div>

      {/* 🔍 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {/* Appointment List */}
      <div className="border rounded p-2 h-[400px] overflow-y-auto">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="flex justify-between items-center border p-3 rounded mb-2"
            >
              <span>{`${appt.name} - ${appt.date} at ${appt.time}`}</span>
              <button
                onClick={() => handleCancel(appt.id)}
                className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-100"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
