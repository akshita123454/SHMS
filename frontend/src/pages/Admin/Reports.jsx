// src/pages/Admin/components/Reports.jsx
import React from "react";

const Reports = () => {
  const handleGenerateReport = () => {
    alert("Generate Report clicked!");
  };
  const handleExportCSV = () => {
    alert("Export CSV clicked!");
  };

  return (
    <section id="reports" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reports</h2>
        <div className="space-x-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleExportCSV}
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Patient Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Total Patients</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span>New Admissions</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discharged</span>
              <span className="font-semibold">38</span>
            </div>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Emergency</span>
              <span className="font-semibold">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Surgery</span>
              <span className="font-semibold">88%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cardiology</span>
              <span className="font-semibold">95%</span>
            </div>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Revenue</span>
              <span className="font-semibold">$234,567</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Expenses</span>
              <span className="font-semibold">$178,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Profit</span>
              <span className="font-semibold text-green-600">$56,333</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
