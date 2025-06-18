// src/pages/patient/components/MedicalHistory.jsx
import React from "react";
import { FileText } from "lucide-react";

const MedicalHistory = () => {
  const history = [
    { date: "2024-10-10", detail: "Flu - Medication" },
    { date: "2025-02-20", detail: "Checkup - Normal" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Medical History</h2>
      </div>
      <div className="border rounded-md divide-y">
        {history.map((item, index) => (
          <div key={index} className="p-3 text-sm">
            <span className="font-medium">{item.date}: </span>
            {item.detail}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
