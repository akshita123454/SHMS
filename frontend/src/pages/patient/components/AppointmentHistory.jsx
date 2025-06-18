// src/pages/patient/components/AppointmentHistory.jsx
import React from "react";

const AppointmentHistory = () => {
  const appointments = [
    { date: "2025-04-15", doctor: "Dr. Rohit Sharma", status: "Completed" },
    { date: "2025-05-01", doctor: "Dr. Sanju Samson", status: "Pending" },
  ];

  const statusStyle = {
    Completed: "bg-gray-500 text-white",
    Pending: "bg-yellow-400 text-white",
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">⏰ Appointment History</h2>
      <div className="space-y-3">
        {appointments.map((appt, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 border rounded">
            <span>{`${appt.date} with ${appt.doctor}`}</span>
            <span className={`px-3 py-1 rounded text-sm font-semibold ${statusStyle[appt.status]}`}>
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistory;
