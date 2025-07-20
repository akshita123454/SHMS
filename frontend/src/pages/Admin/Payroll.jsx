// frontend/src/pages/Admin/Payroll.jsx
import React, { useEffect, useState } from "react";
import { addPayroll } from "../../api/admin/payroll.api.js";
import { fetchStaff } from "../../api/admin/staff.api.js";

const Payroll = () => {
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

  useEffect(() => {
    loadStaff();
  }, []);

  const handleGeneratePayslip = async (e) => {
    e.preventDefault();
    if (!selectedStaff || !selectedMonth) {
      showToast("Please select staff and month.");
      return;
    }

    try {
      const response = await addPayroll({
        staffId: selectedStaff,
        month: selectedMonth,
      });
      setGeneratedPayslip(response.data);
      showToast("Payslip generated successfully!");
    } catch (err) {
      console.error("Error generating payslip", err);
      showToast(
        `Error generating payslip: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Generate Payroll
      </h2>

      {toast && (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
          {toast}
        </div>
      )}

      {/* Payroll Generation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Generate Payslip
        </h3>
        <form
          onSubmit={handleGeneratePayslip}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedStaff(""); // Reset selected staff when department changes
              }}
              className="mt-1 block w-full input"
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
            <label className="block text-sm font-medium text-gray-700">
              Select Staff
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="mt-1 block w-full input"
              required
            >
              <option value="">Select Staff Member</option>
              {staffList
                .filter((s) =>
                  selectedDepartment
                    ? s.department === selectedDepartment
                    : true
                )
                .map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} ({staff.employeeId})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Month
            </label>
            <input
              type="month" // Use type="month" for month and year selection
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-1 block w-full input"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Generate Payslip
            </button>
          </div>
        </form>
      </div>

      {/* Generated Payslip Display */}
      {generatedPayslip && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Payslip for {generatedPayslip.staffId?.name || "N/A"} -{" "}
            {generatedPayslip.month}
          </h3>

          {/* Company Header - Placeholder for actual company details */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">SHMS</h1>
            <p className="text-gray-600">
              Your Company Address, City, State, Zip
            </p>
            <p className="text-gray-600">
              Phone: (123) 456-7890 | Email: info@SHMS.com
            </p>
            <p className="text-gray-600">Website: www.SHMS.com</p>
          </div>

          {/* Employee Details - Now in a table for better formatting */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50 overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700 w-1/2">
                    Employee ID:
                  </td>
                  <td className="py-2 px-2 text-gray-800 w-1/2">
                    {generatedPayslip.employeeId}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Name:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.staffId?.name || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Designation:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.designation}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Location:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.location}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Month:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.month}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Joining Date:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {new Date(
                      generatedPayslip.joiningDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Bank Account:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.bankAccount}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    PF Account:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.pfAccount}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    ESIC Number:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {generatedPayslip.esicNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings - Now in a table */}
            <div>
              <h4 className="font-bold text-gray-700 mb-2">EARNINGS</h4>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generatedPayslip.earnings.map((earning, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {earning.type}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                        {earning.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      Gross Pay
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                      ₹{generatedPayslip.grossPay.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions - Now in a table */}
            <div>
              <h4 className="font-bold text-gray-700 mb-2">DEDUCTIONS</h4>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generatedPayslip.deductions
                    .filter((d) => d.type !== "Professional Tax")
                    .map((deduction, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                          {deduction.type}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          {deduction.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      Net Pay
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                      ₹{generatedPayslip.netPay.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="font-bold text-blue-600 mt-1 text-right">
                ({generatedPayslip.netPayInWords})
              </p>
            </div>
          </div>

          {/* Income Tax Details */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-bold text-gray-700 mb-2">INCOME TAX DETAILS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1">Exemptions</p>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                        Label
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                        Value (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedPayslip.exemptions.map((x, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                          {x.label}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          {x.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="font-semibold mt-4 mb-1">Investments</p>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                        Label
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                        Value (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedPayslip.investments.map((x, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                          {x.label}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          {x.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <p className="font-semibold mb-1">Tax Slabs</p>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                        Slab
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                        Value (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedPayslip.slabWiseTax.map((x, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                          {x.label}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          {x.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="font-semibold mt-4 mb-1">Tax Deducted</p>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                        Type
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-right text-sm font-semibold text-gray-600">
                        Amount (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedPayslip.taxDeductedDetails.map((x, i) => (
                      <tr key={i}>
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                          {x.label}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          {x.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Payroll;
