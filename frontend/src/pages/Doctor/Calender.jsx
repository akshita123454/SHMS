import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const dummyAppointments = [
  {
    date: "2025-07-12",
    time: "10:00 AM",
    patient: "Alice Harper",
    reason: "Routine check-up",
  },
  {
    date: "2025-07-12",
    time: "01:30 PM",
    patient: "Bob Johnson",
    reason: "Follow-up for diabetes",
  },
  {
    date: "2025-07-13",
    time: "09:00 AM",
    patient: "Charlie Rogers",
    reason: "Blood pressure review",
  },
  {
    date: "2025-07-14",
    time: "03:00 PM",
    patient: "Diana Patel",
    reason: "Back pain consultation",
  },
];

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const selected = date.toISOString().split("T")[0];
    const filtered = dummyAppointments.filter(
      (appt) => appt.date === selected
    );
    setFilteredAppointments(filtered);
  }, [date]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full"
          />
          <p className="mt-4 text-sm text-gray-600">
            Selected Date: <span className="font-medium">{date.toDateString()}</span>
          </p>
        </div>

        {/* Appointment List */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Appointments on {date.toDateString()}
          </h3>

          {filteredAppointments.length > 0 ? (
            <ul className="space-y-3">
              {filteredAppointments.map((appt, idx) => (
                <li
                  key={idx}
                  className="border border-gray-200 p-4 rounded-md hover:shadow-sm transition"
                >
                  <p className="text-gray-800 font-medium">Patient: {appt.patient}</p>
                  <p className="text-sm text-gray-600">Time: {appt.time}</p>
                  <p className="text-sm text-gray-600">Reason: {appt.reason}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No appointments for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}
