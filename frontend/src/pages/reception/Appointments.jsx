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
    setAppointments([newAppointment, ...appointments]);
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

    <div className="overflow-x-auto border rounded">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100">
      <tr>
        <th className="text-left p-3 border">#</th>
        <th className="text-left p-3 border">Patient Name</th>
        <th className="text-left p-3 border">Date</th>
        <th className="text-left p-3 border">Time</th>
        <th className="text-left p-3 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {appointments.length === 0 ? (
        <tr>
          <td colSpan="5" className="p-4 text-gray-500 text-center">
            No appointments booked.
          </td>
        </tr>
      ) : (
        appointments.map((appt, index) => (
          <tr key={appt.id} className="border-t">
            <td className="p-3 border">{index + 1}</td>
            <td className="p-3 border">{appt.name}</td>
            <td className="p-3 border">{appt.date}</td>
            <td className="p-3 border">{appt.time}</td>
            <td className="p-3 border">
              <button
                onClick={() => handleCancel(appt.id)}
                className="text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-100"
              >
                Cancel
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


  </ReceptionLayout>
);
}
