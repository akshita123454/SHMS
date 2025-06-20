// src/pages/reception/Appointments.jsx
import React, { useState } from 'react';
import { CalendarPlus } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'John Doe', date: '2025-06-13', time: '10:00' },
    { id: 2, name: 'Jane Smith', date: '2025-06-14', time: '11:30' },
    { id: 3, name: 'Michael Johnson', date: '2025-06-14', time: '09:45' },
    { id: 4, name: 'Emily Davis', date: '2025-06-15', time: '14:15' },
    { id: 5, name: 'William Brown', date: '2025-06-15', time: '13:00' },
    { id: 6, name: 'Olivia Wilson', date: '2025-06-16', time: '12:30' },
    { id: 7, name: 'Liam Martinez', date: '2025-06-16', time: '16:45' },
    { id: 8, name: 'Sophia Anderson', date: '2025-06-17', time: '15:20' },
    { id: 9, name: 'James Thomas', date: '2025-06-17', time: '11:10' },
    { id: 10, name: 'Ava Taylor', date: '2025-06-18', time: '10:50' },
  ]);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleBook = () => {
    if (!name || !date || !time) return;
    const newAppointment = {
      id: Date.now(),
      name,
      date,
      time,
    };
    setAppointments([newAppointment, ...appointments]);
    setName('');
    setDate('');
    setTime('');
  };

  const handleCancel = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
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
