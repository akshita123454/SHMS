import React, { useEffect, useState } from "react";
import {
  fetchStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  fetchDepartmentByRole,
} from "../../api/admin/staff.api.js";

const rolesList = ["admin", "doctor", "reception", "emergency"];

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
    ctc: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStaffForDetails, setSelectedStaffForDetails] = useState(null);
  const [detailsFormData, setDetailsFormData] = useState({
    pfAccount: "",
    bankAccount: "",
    designation: "",
    joiningDate: "",
    location: "",
    hostelAllowance: 0,
    childEducationAllowance: 0,
    bonuses: 0,
  });

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

  const loadDepartments = async (selectedRole) => {
    try {
      const { data } = await fetchDepartmentByRole(selectedRole);
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

      const staffToSend = { ...formData };
      if (!formData.password) delete staffToSend.password;

      if (editingId) {
        await updateStaff(editingId, staffToSend);
        showToast("Staff updated");
      } else {
        await addStaff(staffToSend);
        showToast("Staff added");
      }

      setFormData({
        name: "",
        role: "",
        department: "",
        email: "",
        contact: "",
        password: "",
        ctc: "",
      });
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
      password: "", // do not reuse hashed password
      ctc: staff.ctc,
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

  const handleEmployeeIdClick = (staff) => {
    setSelectedStaffForDetails(staff);
    // Populate modal form data from selected staff object
    setDetailsFormData({
      pfAccount: staff.pfAccount || "",
      bankAccount: staff.bankAccount || "",
      designation: staff.designation || "",
      joiningDate: staff.joiningDate ? staff.joiningDate.substring(0, 10) : "",
      location: staff.location || "",
      hostelAllowance: staff.hostelAllowance || 0,
      childEducationAllowance: staff.childEducationAllowance || 0,
      bonuses: staff.bonuses || 0,
    });
    setShowDetailsModal(true);
  };

  const handleDetailsModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const staffId = selectedStaffForDetails._id;
      const dataToSend = { ...detailsFormData };

      if (dataToSend.joiningDate) {
        dataToSend.joiningDate = new Date(dataToSend.joiningDate).toISOString();
      }

      await updateStaff(staffId, dataToSend);
      showToast("Employee details updated");
      setShowDetailsModal(false);
      loadStaff(); // Reload staff to reflect changes
    } catch (err) {
      console.error("Error updating employee details", err);
      showToast("Error updating employee details");
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <section id="staff" className="section">
      <h2 className="text-xl font-semibold mb-4">Staff Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

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
            {rolesList.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="input"
            required
            disabled={!departments.length}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input"
            required
          />

          <input
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="input"
            required={!editingId}
          />
        </div>

        {/* This div now only contains CTC, as all other fields are moved to the modal */}
        <div className="grid grid-cols-6 gap-4 mt-2">
          <input
            type="number"
            placeholder="CTC"
            value={formData.ctc}
            onChange={(e) =>
              setFormData({
                ...formData,
                ctc: parseFloat(e.target.value || 0),
              })
            }
            className="input"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-lg`}
          >
            {editingId ? "Update Staff" : "Add Staff"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  role: "",
                  department: "",
                  email: "",
                  contact: "",
                  password: "",
                  ctc: "",
                });
                setDepartments([]);
              }}
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
                <th>CTC</th>
                {/* Removed PF Account, Bank Account, Designation, Joining Date, Location, Allowances, Bonuses from table header */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id}>
                  <td>
                    <button
                      onClick={() => handleEmployeeIdClick(staff)}
                      className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      {staff.employeeId}
                    </button>
                  </td>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.department}</td>
                  <td>{staff.email}</td>
                  <td>{staff.contact}</td>
                  <td>₹{staff.ctc}</td>
                  {/* Removed PF Account, Bank Account, Designation, Joining Date, Location, Allowances, Bonuses from table body */}
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(staff)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(staff._id)}
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

      {/* Employee Details Modal */}
      {showDetailsModal && selectedStaffForDetails && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4">
              Edit Details for {selectedStaffForDetails.name} (ID:{" "}
              {selectedStaffForDetails.employeeId})
            </h3>
            <form onSubmit={handleDetailsModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PF Account
                </label>
                <input
                  type="text"
                  value={detailsFormData.pfAccount}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      pfAccount: e.target.value,
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Account
                </label>
                <input
                  type="text"
                  value={detailsFormData.bankAccount}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      bankAccount: e.target.value,
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  value={detailsFormData.designation}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      designation: e.target.value,
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={detailsFormData.joiningDate}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      joiningDate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={detailsFormData.location}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      location: e.target.value,
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hostel Allowance
                </label>
                <input
                  type="number"
                  value={detailsFormData.hostelAllowance}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      hostelAllowance: parseFloat(e.target.value || 0),
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Child Education Allowance
                </label>
                <input
                  type="number"
                  value={detailsFormData.childEducationAllowance}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      childEducationAllowance: parseFloat(e.target.value || 0),
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bonuses
                </label>
                <input
                  type="number"
                  value={detailsFormData.bonuses}
                  onChange={(e) =>
                    setDetailsFormData({
                      ...detailsFormData,
                      bonuses: parseFloat(e.target.value || 0),
                    })
                  }
                  className="mt-1 block w-full input"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StaffManagement;
