// src/pages/patient/components/MedicalHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/patients/all-medical-history")
      .then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h2>Medical History</h2>
     <ul class="text-dark fw-bold fs-4">
  {history.map((h, idx) => (
    <li class="text-dark fw-bold fs-4" key={idx}>
      <strong>{h.name ? h.name : "Unknown Patient"}</strong> - 
      <strong>{h.date ? " " + h.date : " No date"}</strong>: 
      {h.description ? " " + h.description : " No description"}
    </li>
  ))}
</ul>
    </div>
  );
};

export default MedicalHistory;