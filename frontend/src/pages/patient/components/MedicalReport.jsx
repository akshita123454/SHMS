// frontend/src/pages/patient/components/MedicalReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalReports = () => {
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-medical-history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Error fetching medical history:", err));

    axios
      .get("http://localhost:3000/api/patients/all-reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="h-[90vh] flex flex-col gap-4 overflow-hidden">
      {/* Top: Medical History */}
      <div className="flex-1 overflow-y-auto bg-blue-50 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3">Medical History</h2>
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

      {/* Bottom: Reports */}
      <div className="flex-1 overflow-y-auto bg-blue-50 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3">Reports</h2>
        <div className="border rounded-md divide-y">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="p-3 flex justify-between items-center text-sm"
              >
                <span>{report.name}</span>
                <a
                  href={report.link}
                  className="text-blue-500 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm p-3">No reports found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReports;
