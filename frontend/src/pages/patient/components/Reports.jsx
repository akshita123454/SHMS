// src/pages/patient/components/Reports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
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
  );
};

export default Reports;

