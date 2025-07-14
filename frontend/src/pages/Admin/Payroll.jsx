// frontend/src/pages/Admin/Payroll.jsx
import React, { useEffect, useState } from "react";
import {
  fetchPayrolls,
  addPayroll,
  deletePayroll,
} from "../../api/admin/payroll.api.js";
import { fetchStaff } from "../../api/admin/staff.api.js";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
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

  const loadPayrolls = async () => {
    try {
      const { data } = await fetchPayrolls();
      setPayrolls(data);
    } catch (err) {
      console.error("Failed to load payrolls", err);
    }
  };

  const handleGeneratePayslip = async () => {
    try {
      if (!selectedStaff || !selectedMonth) {
        showToast("Please select staff and month");
        return;
      }

      const { data } = await addPayroll({
        staffId: selectedStaff,
        month: selectedMonth,
      });

      setGeneratedPayslip(data);
      showToast("Payslip generated");
      loadPayrolls();
    } catch (err) {
      console.error("Failed to generate payslip", err);
      showToast("Error generating payslip");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePayroll(id);
      showToast("Payroll deleted");
      loadPayrolls();
    } catch (err) {
      console.error("Failed to delete payroll", err);
    }
  };

  useEffect(() => {
    loadStaff();
    loadPayrolls();
  }, []);

  const filteredStaff = staffList.filter(
    (s) => s.department === selectedDepartment
  );

  return (
    <section id="payroll" className="section">
      <h2 className="text-xl font-semibold mb-4">Payroll Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-4">
        <select
          className="input"
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            setSelectedStaff("");
          }}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">Select Staff</option>
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
          onClick={handleGeneratePayslip}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Payslip
        </button>
      </div>

      {generatedPayslip && (
        <div className="p-6 bg-white border shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Payslip - {generatedPayslip.month}
            </h3>
            <button
              onClick={() => setGeneratedPayslip(null)}
              className="text-sm bg-gray-200 px-3 py-1 rounded"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm mb-4">
            <div>
              <p>
                <strong>EMPLOYEE NUMBER:</strong> {generatedPayslip.employeeId}
              </p>
              <p>
                <strong>NAME:</strong> {generatedPayslip.staffId.name}
              </p>
              <p>
                <strong>DESIGNATION:</strong> {generatedPayslip.designation}
              </p>
              <p>
                <strong>POSTED LOCATION:</strong> {generatedPayslip.location}
              </p>
            </div>
            <div>
              <p>
                <strong>BANK ACCOUNT:</strong> {generatedPayslip.bankAccount}
              </p>
              <p>
                <strong>PF ACCOUNT:</strong> {generatedPayslip.pfAccount}
              </p>
              <p>
                <strong>JOINING DATE:</strong>{" "}
                {new Date(generatedPayslip.joiningDate).toLocaleDateString()}
              </p>
              <p>
                <strong>STANDARD DAYS:</strong> {generatedPayslip.standardDays}{" "}
                | <strong>LOP DAYS:</strong> {generatedPayslip.lopDays} |{" "}
                <strong>REFUND DAYS:</strong> {generatedPayslip.refundDays}
              </p>
            </div>
          </div>

          <p className="font-bold text-gray-700 mb-2">EARNINGS</p>
          <table className="w-full table-auto border mb-6 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Monthly Rate</th>
                <th className="border px-2 py-1">Current</th>
                <th className="border px-2 py-1">Arrears</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {generatedPayslip.earnings.map((e, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{e.type}</td>
                  <td className="border px-2 py-1">₹{e.monthlyRate}</td>
                  <td className="border px-2 py-1">₹{e.currentMonth}</td>
                  <td className="border px-2 py-1">₹{e.arrears}</td>
                  <td className="border px-2 py-1">₹{e.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="font-bold text-gray-700 mb-2">DEDUCTIONS</p>
          <table className="w-full table-auto border mb-6 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {generatedPayslip.deductions.map((d, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{d.type}</td>
                  <td className="border px-2 py-1">₹{d.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-sm">
            <p>
              <strong>Gross Pay:</strong> ₹{generatedPayslip.grossPay}
            </p>
            <p>
              <strong>Total Deductions:</strong> ₹
              {generatedPayslip.deductions.reduce(
                (sum, d) => sum + d.amount,
                0
              )}
            </p>
            <p className="text-lg font-bold text-green-600">
              Net Pay: ₹{generatedPayslip.netPay}
            </p>
            <p className="italic">{generatedPayslip.netPayInWords}</p>
          </div>

          {generatedPayslip.taxDeductedDetails && (
            <div className="mt-8">
              <h4 className="font-bold text-gray-700 mb-2">
                INCOME TAX DETAILS
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
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