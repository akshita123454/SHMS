// src/pages/patient/components/AppointmentHistory.jsx
// src/pages/patient/components/AppointmentHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-appointments")
      .then((res) => {
        // Sort newest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAppointments(sorted);
      })
      .catch((err) =>
        console.error("Error fetching appointments:", err.message)
      );
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "No date";
    return new Date(isoDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusStyle = {
    Completed: "bg-gray-500 text-white",
    Pending: "bg-yellow-400 text-white",
    Cancelled: "bg-red-500 text-white",
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        ⏰ Appointment History
      </h2>
      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appt, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded"
            >
              <div>
                <p>
                  <strong>Doctor:</strong> {appt.doctor}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(appt.date)}{" "}
                  <strong>Time:</strong> {appt.time || "N/A"}
                </p>
                <p>
                  <strong>Reason:</strong> {appt.reason || "Not specified"}
                </p>
              </div>
              <span
                className={`mt-2 md:mt-0 px-3 py-1 rounded text-sm font-semibold ${
                  statusStyle[appt.status] || "bg-gray-300 text-black"
                }`}
              >
                {appt.status || "Unknown"}
              </span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">
            No appointment history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
