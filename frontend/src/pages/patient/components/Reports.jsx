// src/pages/patient/components/Reports.jsx
import React from "react";
import { FileText } from "lucide-react";

const Reports = () => {
  const reports = [
    { name: "Blood Test.pdf", link: "#" },
    { name: "X-Ray.pdf", link: "#" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Reports</h2>
      </div>
      <div className="border rounded-md divide-y">
        {reports.map((report, index) => (
          <div
            key={index}
            className="p-3 flex justify-between items-center text-sm"
          >
            <span>{report.name}</span>
            <a
              href={report.link}
              className="text-blue-500 hover:underline text-sm"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
