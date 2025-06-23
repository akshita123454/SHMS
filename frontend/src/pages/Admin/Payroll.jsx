import React, { useEffect, useState } from "react";
import {
  fetchPayrolls,
  addPayroll,
  updatePayroll,
  deletePayroll,
} from "../../api/admin/payroll.api.js";
import { fetchStaff } from "../../api/admin/staff.api.js"; // if you have this API

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    staffId: "",
    month: "",
    salary: 0,
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadPayrolls = async () => {
    try {
      const { data } = await fetchPayrolls();
      setPayrolls(data);
    } catch (/** @type {any} */ err) {
      showToast("Failed to load payrolls");
    }
  };

  const loadStaffList = async () => {
    try {
      const { data } = await fetchStaff(); // or use fetch("/api/staff")
      setStaffList(data);
    } catch (/** @type {any} */ err) {
      showToast("Failed to load staff");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePayroll(editingId, formData);
        showToast("Payroll updated");
      } else {
        await addPayroll(formData);
        showToast("Payroll added");
      }
      setFormData({ staffId: "", month: "", salary: 0, status: "Pending" });
      setEditingId(null);
      loadPayrolls();
    } catch (/** @type {any} */ err) {
      showToast("Error saving payroll");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      staffId: item.staffId._id || item.staffId, // handles both populated or plain
      month: item.month,
      salary: item.salary,
      status: item.status,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePayroll(id);
      showToast("Payroll deleted");
      loadPayrolls();
    } catch (/** @type {any} */ err) {
      showToast("Failed to delete payroll");
    }
  };

  useEffect(() => {
    loadPayrolls();
    loadStaffList();
  }, []);

  const totalSalary = payrolls.reduce((sum, p) => sum + p.salary, 0);
  const processedCount = payrolls.filter(
    (p) => p.status === "Processed"
  ).length;
  const processedPercentage = payrolls.length
    ? Math.round((processedCount / payrolls.length) * 100)
    : 0;

  return (
    <section id="payroll" className="section">
      <h2 className="text-xl font-semibold mb-4">Payroll Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-4 gap-4">
          <select
            value={formData.staffId}
            onChange={(e) =>
              setFormData({ ...formData, staffId: e.target.value })
            }
            className="input"
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name} ({staff.role})
              </option>
            ))}
          </select>
          <input
            type="month"
            placeholder="Month"
            value={formData.month}
            onChange={(e) =>
              setFormData({ ...formData, month: e.target.value })
            }
            className="input"
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: parseInt(e.target.value) })
            }
            className="input"
            required
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="input"
          >
            <option>Pending</option>
            <option>Processed</option>
          </select>
        </div>
        <button
          type="submit"
          className={`${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-lg`}
        >
          {editingId ? "Update Payroll" : "Add Payroll"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                staffId: "",
                month: "",
                salary: 0,
                status: "Pending",
              });
            }}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Salary</span>
              <span className="font-semibold">
                ${totalSalary.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Processed</span>
              <span className="font-semibold">{processedPercentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending</span>
              <span className="font-semibold">
                {100 - processedPercentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100"
              onClick={() => showToast("Payslips generated (mock)")}
            >
              Generate Payslips
            </button>
            <button
              className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100"
              onClick={() => showToast("Reports exported (mock)")}
            >
              Export Reports
            </button>
            <button
              className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100"
              onClick={() => showToast("Taxes calculated (mock)")}
            >
              Tax Calculations
            </button>
          </div>
        </div>
      </div>

      <div className="module-card">
        <h3 className="text-lg font-semibold mb-4">Payroll Table</h3>
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Month</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p._id}>
                  <td>
                    {typeof p.staffId === "object"
                      ? `${p.staffId.name} (${p.staffId.role})`
                      : p.staffId}
                  </td>
                  <td>{p.month}</td>
                  <td>${p.salary}</td>
                  <td>{p.status}</td>
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Payroll;
