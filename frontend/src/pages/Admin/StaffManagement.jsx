// src/pages/Admin/StaffManagement.jsx
import React, { useEffect, useState } from "react";
import {
  fetchStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  fetchDepartmentByRole,
} from "../../api/admin/staff.api.js";

// static list of roles
const rolesList = ['admin', 'doctor', 'reception', 'patient', 'developer', 'emergency'];

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    contact: "",
    password: "",
    baseSalary: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadStaff = async () => {
    try {
      const { data } = await fetchStaff();
      setStaffList(data);
    } catch (err) {
      console.error("Error loading staff", err);
      showToast("Failed to load staff");
    }
  };

  // fetch departments for a given role
  const loadDepartments = async (selectedRole) => {
    try {
      const { data } = await fetchDepartmentByRole(selectedRole);
      console.log("heelo")
      console.log(data);
      setDepartments(data);
      setFormData((prev) => ({
        ...prev,
        role: selectedRole,
        department: data.length > 0 ? data[0] : "",
      }));
    } catch (err) {
      console.error("Error loading departments", err);
      setDepartments([]);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    loadDepartments(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.department) {
        showToast("Please select a department.");
        return;
      }

      if (editingId) {
        await updateStaff(editingId, formData);
        showToast("Staff updated");
      } else {
        await addStaff(formData);
        showToast("Staff added");
      }

      setFormData({ name: "", role: "", department: "", email: "", contact: "", password: "", baseSalary: "" });
      setDepartments([]);
      setEditingId(null);
      loadStaff();
    } catch (err) {
      console.error("Error saving staff", err);
      showToast("Error saving staff");
    }
  };

  const handleEdit = (staff) => {
    setFormData({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      email: staff.email,
      contact: staff.contact,
      password: staff.password,
      baseSalary: staff.baseSalary,
    });
    setEditingId(staff._id);
    loadDepartments(staff.role);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      showToast("Staff deleted");
      loadStaff();
    } catch (err) {
      console.error("Error deleting staff", err);
      showToast("Failed to delete staff");
    }
  };

  useEffect(() => { loadStaff(); }, []);

  return (
    <section id="staff" className="section">
      <h2 className="text-xl font-semibold mb-4">Staff Management</h2>

      {toast && <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">{toast}</div>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            required
          />

          <select
            value={formData.role}
            onChange={handleRoleChange}
            className="input"
            required
          >
            <option value="">Select Role</option>
            {rolesList.map((r) => (<option key={r} value={r}>{r}</option>))}
          </select>

          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="input"
            required
            disabled={!departments.length}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
          </select>

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input"
            required
          />

          <input
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input"
            required
          />
        </div>

        <div className="grid grid-cols-6 gap-4 mt-2">
          <input
            type="number"
            placeholder="Base Salary"
            value={formData.baseSalary}
            onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
            className="input"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg`}
          >
            {editingId ? "Update Staff" : "Add Staff"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setFormData({ name: "", role: "", department: "", email: "", contact: "", password: "", baseSalary: "" }); setDepartments([]); }}
              className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="module-card">
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Contact</th>
                {/* <th>Password</th> */}
                <th>Base Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id}>
                  <td>{staff.employeeId}</td>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.department}</td>
                  <td>{staff.email}</td>
                  <td>{staff.contact}</td>
                  {/* <td>{staff.password}</td> */}
                  <td>₹{staff.baseSalary}</td>
                  <td>
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(staff)}>Edit</button>
                    <button className="text-red-500 hover:text-red-700 ml-3" onClick={() => handleDelete(staff._id)}>Delete</button>
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

export default StaffManagement;
