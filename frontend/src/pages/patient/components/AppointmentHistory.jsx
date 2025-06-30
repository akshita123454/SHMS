// src/pages/patient/components/AppointmentHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const statusStyle = {
    Completed: "bg-gray-500 text-white",
    Pending: "bg-yellow-400 text-white",
    Cancelled: "bg-red-500 text-white",
  };

  return (
    <div className="bg-white p-4 rounded shadow ">
      <h2 className="text-xl font-semibold mb-3 "> Appointment History</h2>
      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appt, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border rounded">
              <span>
                {appt.date || "No date"} with {appt.doctor || "Unknown"}
              </span>
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  statusStyle[appt.status] || "bg-gray-300 text-black"
                }`}
              >
                {appt.status || "Unknown"}
              </span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No appointment history found.</div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
