import React, { useEffect, useState } from "react";
import {
  fetchPayrolls,
  addPayroll,
  deletePayroll,
} from "../../api/admin/payroll.api.js";
import { fetchStaff } from "../../api/admin/staff.api.js";

const Payroll = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [payslip, setPayslip] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    fetchStaff().then(({ data }) => {
      setStaffList(data);
      setDepartments([...new Set(data.map((s) => s.department))]);
    });
  }, []);

  const generate = () => {
    if (!selectedStaff || !selectedMonth)
      return showToast("Select staff & month");
    addPayroll({ staffId: selectedStaff, month: selectedMonth })
      .then(({ data }) => {
        setPayslip(data);
        showToast("Payslip generated");
      })
      .catch(() => showToast("Error generating payslip"));
  };

  const filteredStaff = staffList.filter(
    (s) => s.department === selectedDepartment
  );

  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4">Payroll Management</h2>
      {toast && (
        <div className="mb-2 bg-green-200 px-3 py-1 rounded">{toast}</div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <select
          className="input"
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            setSelectedStaff("");
          }}
        >
          <option value="">Department</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          className="input"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">Staff</option>
          {filteredStaff.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.role})
            </option>
          ))}
        </select>
        <input
          type="month"
          className="input"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        <button
          onClick={generate}
          className="bg-blue-500 text-white rounded px-4"
        >
          Generate
        </button>
      </div>

      {/* Payslip Display */}
      {payslip && (
        <div className="border p-6 space-y-4 module-card">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">
              Employee Number : {payslip.employeeId}
            </h3>
            <button
              onClick={() => setPayslip(null)}
              className="bg-gray-200 px-2 rounded"
            >
              Close
            </button>
          </div>
          <p>
            <strong>Name :</strong> {payslip.staffId.name} &nbsp; | &nbsp;{" "}
            <strong>Designation :</strong> {payslip.designation}
          </p>
          <p>
            <strong>Posted Location :</strong> {payslip.location}
          </p>

          {/* Earnings Table */}
          <h4 className="font-semibold mt-4">EARNINGS</h4>
          <table className="w-full text-sm border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-1">Type</th>
                <th className="border px-1">Monthly Rate</th>
                <th className="border px-1">Current</th>
                <th className="border px-1">Arrears</th>
                <th className="border px-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {payslip.earnings.map((e, i) => (
                <tr key={i}>
                  <td className="border px-1">{e.type}</td>
                  <td className="border px-1">₹{e.monthlyRate}</td>
                  <td className="border px-1">₹{e.currentMonth}</td>
                  <td className="border px-1">₹{e.arrears}</td>
                  <td className="border px-1">₹{e.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Deductions */}
          <h4 className="font-semibold">DEDUCTIONS</h4>
          <table className="w-full text-sm border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-1">Type</th>
                <th className="border px-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payslip.deductions.map((d, i) => (
                <tr key={i}>
                  <td className="border px-1">{d.type}</td>
                  <td className="border px-1">₹{d.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Net Pay */}
          <p className="text-right font-bold text-green-700">
            Net Salary Payable: ₹{payslip.netPay}{" "}
            <span className="block text-sm italic">
              ({payslip.netPayInWords})
            </span>
          </p>

          {/* Tax Calculation Section */}
          <h4 className="font-semibold mt-6">
            INCOME TAX CALCULATION (Annual)
          </h4>
          <table className="w-full text-xs border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-1">FROM</th>
                <th className="border px-1">TO</th>
                <th className="border px-1">RATE %</th>
                <th className="border px-1">TAX AMT</th>
              </tr>
            </thead>
            <tbody>
              {payslip.taxSlabs.map((s, i) => (
                <tr key={i}>
                  <td className="border px-1">₹{s.from}</td>
                  <td className="border px-1">
                    ₹{s.to === Infinity ? "∞" : s.to}
                  </td>
                  <td className="border px-1">{s.rate}</td>
                  <td className="border px-1">₹{s.taxAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right text-sm mt-1">
            Annual Tax Payable: ₹{payslip.taxPayable} &nbsp; | &nbsp; Monthly: ₹
            {payslip.taxDeductedThisMonth}
          </p>
        </div>
      )}
    </section>
  );
};

export default Payroll;
