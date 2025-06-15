// src/pages/reception/Appointments.jsx
import React, { useState } from 'react';

import ReceptionLayout from './components/layout/ReceptionLayout';
import { CalendarPlus, CalendarDays, Clock } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'John Doe', date: '2025-06-13', time: '10:00' },
    { id: 2, name: 'Jane Smith', date: '2025-06-14', time: '11:30' },
  ]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = () => {
    if (!name || !date || !time) return;
    const newAppointment = {
      id: Date.now(),
      name,
      date,
      time,
    };
    setAppointments([...appointments, newAppointment]);
    setName('');
    setDate('');
    setTime('');
  };

  const handleCancel = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <ReceptionLayout>
      
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <CalendarPlus className="w-6 h-6" />
          Manage Appointments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="relative col-span-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
            
          </div>
          <div className="relative col-span-1">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 rounded w-full"
            />
            
          </div>

          <div className="mb-6">
          <button
            onClick={handleBook}
            className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700"
          >
            Book Appointment
          </button>
          </div>
        </div>

        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex justify-between items-center border p-3 rounded mb-2"
          >
            <span>{`${appt.name} - ${appt.time}`}</span>
            <button
              onClick={() => handleCancel(appt.id)}
              className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-100"
            >
              Cancel
            </button>
          </div>
        ))}
      
    </ReceptionLayout>
  );
}
