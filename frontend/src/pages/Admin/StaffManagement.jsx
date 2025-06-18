// src/pages/Admin/components/StaffManagement.jsx
import React from "react";

const StaffManagement = () => {
  const staffData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Cardiology",
      role: "Senior Physician",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      department: "Emergency",
      role: "Emergency Physician",
      status: "Active",
    },
    {
      id: 3,
      name: "Nurse Emily White",
      department: "ICU",
      role: "Head Nurse",
      status: "Active",
    },
    {
      id: 4,
      name: "Admin Clerk David Lee",
      department: "Administration",
      role: "Front Desk",
      status: "Active",
    },
    {
      id: 5,
      name: "Dr. John Doe",
      department: "Pediatrics",
      role: "Junior Doctor",
      status: "On Leave",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit staff member with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete staff member with ID: ${id}`);
  };

  const handleAddStaff = () => {
    alert("Add new staff member clicked!");
  };

  return (
    <section id="staff" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Staff Management</h2>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          onClick={handleAddStaff}
        >
          Add New Staff
        </button>
      </div>
      <div className="module-card">
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.department}</td>
                  <td>{staff.role}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        staff.status === "Active"
                          ? "status-active"
                          : "status-pending"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(staff.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(staff.id)}
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

export default StaffManagement;
