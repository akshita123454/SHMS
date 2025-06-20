// src/pages/Admin/components/Payroll.jsx
import React from "react";

const Payroll = () => {
  const handleGeneratePayroll = () => {
    alert("Generate Payroll clicked!");
  };
  const handleGeneratePayslips = () => {
    alert("Generate Payslips clicked!");
  };
  const handleExportReports = () => {
    alert("Export Reports clicked!");
  };
  const handleTaxCalculations = () => {
    alert("Tax Calculations clicked!");
  };

  return (
    <section id="payroll" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payroll Management</h2>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          onClick={handleGeneratePayroll}
        >
          Generate Payroll
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Salary</span>
              <span className="font-semibold">$125,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Processed</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending</span>
              <span className="font-semibold">15%</span>
            </div>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100"
              onClick={handleGeneratePayslips}
            >
              Generate Payslips
            </button>
            <button
              className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100"
              onClick={handleExportReports}
            >
              Export Reports
            </button>
            <button
              className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100"
              onClick={handleTaxCalculations}
            >
              Tax Calculations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payroll;
