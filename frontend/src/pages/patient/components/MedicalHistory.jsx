// src/pages/patient/components/MedicalHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-medical-history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Error fetching medical history:", err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md ">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Medical History</h2>
      </div>

      <div className="border rounded-md divide-y">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="p-3 text-sm">
              <span className="font-medium">{item.date || "No date"}: </span>
              {item.description || "No description"}
            </div>
          ))
        ) : (
          <div className="p-3 text-sm text-gray-500">No medical history found.</div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
