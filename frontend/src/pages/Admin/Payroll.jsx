// frontend/src/pages/Admin/Payroll.jsx
import React, { useEffect, useState } from "react";
import {
  // fetchPayrolls, // Can be removed if not needed elsewhere
  addPayroll,
  // deletePayroll, // Can be removed if not needed elsewhere
} from "../../api/admin/payroll.api.js";
import { fetchStaff } from "../../api/admin/staff.api.js";

const Payroll = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  // Reverted to selectedMonth to store the "Month Year" string
  const [selectedMonth, setSelectedMonth] = useState("");
  const [generatedPayslip, setGeneratedPayslip] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadStaff = async () => {
    try {
      const { data } = await fetchStaff();
      setStaffList(data);
      const depts = [...new Set(data.map((s) => s.department))];
      setDepartments(depts);
    } catch (err) {
      console.error("Failed to load staff", err);
      showToast("Failed to load staff");
    }
  };

  const handleGeneratePayslip = async (e) => {
    e.preventDefault();
    if (!selectedStaff || !selectedMonth) {
      showToast("Please select a staff member and a month.");
      return;
    }

    try {
      const { data } = await addPayroll({
        staffId: selectedStaff,
        month: selectedMonth, // selectedMonth is already in "Month Year" format
      });
      setGeneratedPayslip(data);
      showToast("Payslip generated successfully!");
    } catch (err) {
      console.error("Failed to generate payslip", err);
      showToast(err.response?.data?.error || "Failed to generate payslip");
    }
  };

  const handleClosePayslip = () => {
    setGeneratedPayslip(null);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const filteredStaff = selectedDepartment
    ? staffList.filter((staff) => staff.department === selectedDepartment)
    : staffList;

  // Re-generating last 12 months for dropdown
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  });

  return (
    <section id="payroll" className="section">
      <h2 className="text-xl font-semibold mb-4">Payroll Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      {/* Payroll Generation Form */}
      <form onSubmit={handleGeneratePayslip} className="mb-6 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Select Department:
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedStaff(""); // Reset staff selection when department changes
              }}
              className="input mt-1 block w-full"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="staff"
              className="block text-sm font-medium text-gray-700"
            >
              Select Staff Member:
            </label>
            <select
              id="staff"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="input mt-1 block w-full"
              required
            >
              <option value="">Select Staff</option>
              {filteredStaff.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} ({staff.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700"
            >
              Select Month:
            </label>
            {/* Reverted to select dropdown for month and year */}
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input mt-1 block w-full"
              required
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Generate Payslip
        </button>
      </form>

      {/* Generated Payslip Display */}
      {generatedPayslip && (
        <div className="module-card p-6 border-2 border-gray-300 rounded-lg shadow-lg relative">
          <button
            onClick={handleClosePayslip}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold hover:bg-red-600 focus:outline-none"
            title="Close Payslip"
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Payslip for {generatedPayslip.month}
          </h3>

          {/* Employee Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <strong>Employee ID:</strong> {generatedPayslip.employeeId}
              </p>
              <p>
                <strong>Name:</strong> {generatedPayslip.staffId.name}
              </p>
              <p>
                <strong>Role:</strong> {generatedPayslip.staffId.role}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {generatedPayslip.staffId.department}
              </p>
              <p>
                <strong>Designation:</strong> {generatedPayslip.designation}
              </p>
              <p>
                <strong>Location:</strong> {generatedPayslip.location}
              </p>
            </div>
            <div>
              <p>
                <strong>Email:</strong> {generatedPayslip.staffId.email}
              </p>
              <p>
                <strong>Contact:</strong> {generatedPayslip.staffId.contact}
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                {generatedPayslip.joiningDate
                  ? new Date(generatedPayslip.joiningDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Bank Account:</strong> {generatedPayslip.bankAccount}
              </p>
              <p>
                <strong>PF Account:</strong> {generatedPayslip.pfAccount}
              </p>
            </div>
          </div>

          {/* Earnings and Deductions Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-2">EARNINGS</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedPayslip.earnings.map((earning, index) => (
                    <tr key={index}>
                      <td className="p-2">{earning.type}</td>
                      <td className="p-2 text-right">
                        ₹{earning.total?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td className="p-2">GROSS PAY</td>
                    <td className="p-2 text-right">
                      ₹{generatedPayslip.grossPay?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="font-bold text-gray-700 mb-2">DEDUCTIONS</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedPayslip.deductions.map((deduction, index) => (
                    <tr key={index}>
                      <td className="p-2">{deduction.type}</td>
                      <td className="p-2 text-right">
                        ₹{deduction.amount?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td className="p-2">TOTAL DEDUCTIONS</td>
                    <td className="p-2 text-right">
                      ₹
                      {generatedPayslip.deductions
                        .reduce((sum, d) => sum + d.amount, 0)
                        ?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Pay and Tax Details */}
          <div className="bg-blue-100 p-4 rounded-lg text-center mb-6">
            <h4 className="text-xl font-bold text-blue-800">
              NET PAY: ₹{generatedPayslip.netPay?.toFixed(2)}
            </h4>
            <p className="text-blue-700 italic">
              ({generatedPayslip.netPayInWords})
            </p>
          </div>

          {generatedPayslip.exemptions &&
            generatedPayslip.investments &&
            generatedPayslip.slabWiseTax &&
            generatedPayslip.taxDeductedDetails && (
              <div className="mt-8">
                <h4 className="font-bold text-gray-700 mb-2">
                  INCOME TAX DETAILS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Exemptions</p>
                    {generatedPayslip.exemptions.map((x, i) => (
                      <p key={i}>
                        {x.label}: ₹{x.value}
                      </p>
                    ))}

                    <p className="font-semibold mt-4 mb-1">Investments</p>
                    {generatedPayslip.investments.map((x, i) => (
                      <p key={i}>
                        {x.label}: ₹{x.value}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Tax Slabs</p>
                    {generatedPayslip.slabWiseTax.map((x, i) => (
                      <p key={i}>
                        {x.label}: ₹{x.value}
                      </p>
                    ))}

                    <p className="font-semibold mt-4 mb-1">Tax Deducted</p>
                    {generatedPayslip.taxDeductedDetails.map((x, i) => (
                      <p key={i}>
                        {x.label}: ₹{x.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </section>
  );
};

export default Payroll;
