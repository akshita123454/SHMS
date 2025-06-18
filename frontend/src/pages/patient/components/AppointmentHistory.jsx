// src/pages/patient/components/AppointmentHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/patients/all-appointments")
      .then(res => setAppointments(res.data));
  }, []);

  return (
    <div>

      <ul className="text-dark fw-bold fs-4">
        {appointments.map((a, idx) => (
          <li class="text-dark fw-bold fs-4" key={idx}>
            {a.date ? a.date : "No date"} with Dr. {a.doctor ? a.doctor : "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentHistory;