import React, { useEffect, useState } from "react";
import {
  fetchStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  fetchDepartmentByRole,
} from "../../api/admin/staff.api.js";
import { addPayroll } from "../../api/admin/payroll.api.js";

const rolesList = [
  "admin",
  "doctor",
  "reception",
  "patient",
  "developer",
  "emergency",
];

// Define common blood groups for the dropdown
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
  const [selectedStaffForDetails, setSelectedStaffForDetails] = useState(null);
  const [detailsFormData, setDetailsFormData] = useState({
    pfAccount: "",
    bankAccount: "",
    esicNumber: "",
    designation: "",
    joiningDate: "",
    location: "",
    isMetroCity: false,
    // Removed hostelAllowance and childEducationAllowance
    bonuses: 0,
    // NEW FIELDS ADDED HERE
    emergencyContact: "",
    previousExperience: "",
    bloodGroup: "",
    // Added 'otherAllowance' instead
    otherAllowance: 0,
  });
  const [generatedPayslip, setGeneratedPayslip] = useState(null);
  const [isDetailsEditable, setIsDetailsEditable] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0: Add/Edit, 1: Staff List, 2: Staff Details

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

  useEffect(() => {
    loadStaff();
    // Initially display the Add/Edit Staff form
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (formData.role) {
      loadDepartmentsByRole(formData.role);
    }
  }, [formData.role]);

  const loadDepartmentsByRole = async (role) => {
    try {
      const { data } = await fetchDepartmentByRole(role);
      setDepartments(data);
      if (!data.includes(formData.department)) {
        setFormData((prev) => ({ ...prev, department: "" }));
      }
    } catch (err) {
      console.error("Error loading departments", err);
      showToast("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetailsFormData({
      ...detailsFormData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "isMetroCity"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStaff(editingId, formData);
        showToast("Staff updated successfully!");
      } else {
        await addStaff(formData);
        showToast("Staff added successfully!");
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
      setEditingId(null);
      await loadStaff(); // Ensure staff list is updated before moving
      setCurrentStep(1); // Move to Staff List after adding/editing
    } catch (err) {
      console.error("Error saving staff", err);
      showToast(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (staff) => {
    setFormData({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      email: staff.email,
      contact: staff.contact,
      password: "", // Password should not be pre-filled for security
      ctc: staff.ctc,
    });
    setEditingId(staff._id);
    setCurrentStep(0); // Go back to Add/Edit form for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await deleteStaff(id);
        showToast("Staff deleted successfully!");
        loadStaff();
      } catch (err) {
        console.error("Error deleting staff", err);
        showToast(`Error: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleEmployeeIdClick = (staff) => {
    setSelectedStaffForDetails(staff);
    setDetailsFormData({
      pfAccount: staff.pfAccount || "",
      bankAccount: staff.bankAccount || "",
      esicNumber: staff.esicNumber || "",
      designation: staff.designation || "",
      joiningDate: staff.joiningDate
        ? new Date(staff.joiningDate).toISOString().split("T")[0]
        : "",
      location: staff.location || "",
      isMetroCity: staff.isMetroCity || false,
      // Removed initialization for hostelAllowance and childEducationAllowance
      bonuses: staff.bonuses || 0,
      // Initialize new fields
      emergencyContact: staff.emergencyContact || "",
      previousExperience: staff.previousExperience || "",
      bloodGroup: staff.bloodGroup || "",
      // Initialize 'otherAllowance'
      otherAllowance: staff.otherAllowance || 0,
    });
    setGeneratedPayslip(null);
    setIsDetailsEditable(!staff.payrollGenerated);
    setCurrentStep(2); // Move to Staff Details section
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    try {
      const updatedStaff = { ...selectedStaffForDetails, ...detailsFormData };
      await updateStaff(selectedStaffForDetails._id, updatedStaff);
      showToast("Staff details updated successfully!");
      setSelectedStaffForDetails(updatedStaff);
      await loadStaff(); // Ensure staff list is updated
    } catch (err) {
      console.error("Error saving staff details", err);
      showToast(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleGeneratePayslip = async () => {
    try {
      const response = await addPayroll({
        staffId: selectedStaffForDetails._id,
        month: new Date().toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        }),
      });
      setGeneratedPayslip(response.data);
      setIsDetailsEditable(false);
      showToast("Payslip generated successfully!");
      await loadStaff(); // Ensure staff list is updated
    } catch (err) {
      console.error("Error generating payslip", err);
      showToast(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCloseDetails = () => {
    setSelectedStaffForDetails(null);
    setGeneratedPayslip(null);
    setIsDetailsEditable(true);
    setCurrentStep(1); // Go back to Staff List
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto bg-gray-100 min-h-screen font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Staff Management
      </h2>

      {toast && (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
          {toast}
        </div>
      )}

      {/* Navigation buttons - Reduced mb from 8 to 4 */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => {
            setCurrentStep(0);
            setEditingId(null); // Reset editing state when going to Add Staff
            setFormData({
              name: "",
              role: "",
              department: "",
              email: "",
              contact: "",
              password: "",
              ctc: "",
            });
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
            currentStep === 0
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Add/Edit Staff
        </button>
        <button
          onClick={() => {
            setCurrentStep(1);
            setSelectedStaffForDetails(null); // Clear selected staff when going to list
            setGeneratedPayslip(null); // Clear generated payslip
            setIsDetailsEditable(true); // Reset editable state
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
            currentStep === 1
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Staff List
        </button>
      </div>

      {/* Conditional Rendering based on currentStep */}

      {/* Add/Edit Staff Form - Reduced mb from 8 to 4 */}
      {currentStep === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Staff" : "Add New Staff"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Role</option>
                {rolesList.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.role}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required={!editingId}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CTC (Cost to Company)
              </label>
              <input
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
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
                  }}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Staff List */}
      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Existing Staff
          </h3>
          {staffList.length === 0 ? (
            <p className="text-gray-600">No staff added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Employee ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Department
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      CTC
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr key={staff._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.name}
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-200 text-sm text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleEmployeeIdClick(staff)}
                      >
                        {staff.employeeId}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.role}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.department}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.email}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        ₹{staff.ctc.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Staff Details Section */}
      {currentStep === 2 && selectedStaffForDetails && (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Staff Details: {selectedStaffForDetails.name} (
            {selectedStaffForDetails.employeeId})
          </h3>

          {/* Display initial staff details in a tabular format */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50 overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700 w-1/2">
                    Name:
                  </td>
                  <td className="py-2 px-2 text-gray-800 w-1/2">
                    {selectedStaffForDetails.name}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Employee ID:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.employeeId}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Role:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.role}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Department:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.department}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Email:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.email}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Contact:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.contact}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    CTC:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    ₹{selectedStaffForDetails.ctc.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Input form for additional details (conditionally rendered only if payslip not generated) */}
          {!generatedPayslip && (
            <form
              onSubmit={handleSaveDetails}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PF Account
                </label>
                <input
                  type="text"
                  name="pfAccount"
                  value={detailsFormData.pfAccount}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Account
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={detailsFormData.bankAccount}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ESIC Number
                </label>
                <input
                  type="text"
                  name="esicNumber"
                  value={detailsFormData.esicNumber}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={detailsFormData.designation}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={detailsFormData.joiningDate}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={detailsFormData.location}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HRA City Type
                </label>
                <select
                  name="isMetroCity"
                  value={detailsFormData.isMetroCity}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                >
                  <option value={false}>Non-Metro City</option>
                  <option value={true}>Metro City</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bonuses
                </label>
                <input
                  type="number"
                  name="bonuses"
                  value={detailsFormData.bonuses}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>

              {/* Added 'Other Allowance' field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Other Allowance
                </label>
                <input
                  type="number"
                  name="otherAllowance"
                  value={detailsFormData.otherAllowance}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>

              {/* Previously added fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={detailsFormData.emergencyContact}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous Experience
                </label>
                <input
                  type="text"
                  name="previousExperience"
                  value={detailsFormData.previousExperience}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={detailsFormData.bloodGroup}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isDetailsEditable}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {isDetailsEditable && (
                <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Save Details
                  </button>
                </div>
              )}
            </form>
          )}

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            {!generatedPayslip && !selectedStaffForDetails.payrollGenerated && (
              <button
                onClick={handleGeneratePayslip}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
                disabled={!isDetailsEditable}
              >
                Generate Payslip
              </button>
            )}
            <button
              onClick={handleCloseDetails}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 text-lg font-semibold"
            >
              Close
            </button>
          </div>

          {/* Display Generated Payslip (conditionally rendered) */}
          {generatedPayslip && (
            <div className="mt-8 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Generated Payslip
              </h4>
              {/* Company Header - Placeholder for actual company details */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">SHMS</h1>
                <p className="text-gray-600">
                  Your Company Address, City, State, Zip
                </p>
                <p className="text-gray-600">
                  Phone: (123) 456-7890 | Email: info@shms.com
                </p>
                <p className="text-gray-600">Website: www.shms.com</p>
              </div>

              {/* Employee Details Table */}
              <div className="mb-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Employee ID:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.employeeId}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Month:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.month}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Name:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {selectedStaffForDetails.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Joining Date:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {new Date(
                          generatedPayslip.joiningDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Designation:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.designation}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Bank Account:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.bankAccount}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Location:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.location}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        PF Account:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.pfAccount}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        ESIC Number:
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-200 text-gray-800"
                        colSpan="3"
                      >
                        {generatedPayslip.esicNumber}
                      </td>
                    </tr>
                    {/* Display 'Other Allowance' in payslip preview */}
                    {selectedStaffForDetails.otherAllowance > 0 && (
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                          Other Allowance:
                        </td>
                        <td
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
                          colSpan="3"
                        >
                          ₹
                          {selectedStaffForDetails.otherAllowance.toLocaleString()}
                        </td>
                      </tr>
                    )}
                    {/* Previously added fields display */}
                    {selectedStaffForDetails.emergencyContact && (
                      <tr className="bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                          Emergency Contact:
                        </td>
                        <td
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
                          colSpan="3"
                        >
                          {selectedStaffForDetails.emergencyContact}
                        </td>
                      </tr>
                    )}
                    {selectedStaffForDetails.previousExperience && (
                      <tr>
                        <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                          Previous Experience:
                        </td>
                        <td
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
                          colSpan="3"
                        >
                          {selectedStaffForDetails.previousExperience}
                        </td>
                      </tr>
                    )}
                    {selectedStaffForDetails.bloodGroup && (
                      <tr className="bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                          Blood Group:
                        </td>
                        <td
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
                          colSpan="3"
                        >
                          {selectedStaffForDetails.bloodGroup}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Earnings Table */}
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

                {/* Deductions Table */}
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
                      {generatedPayslip.deductions.map((deduction, i) => (
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

              {/* Income Tax Details Tables */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-bold text-gray-700 mb-2">
                  INCOME TAX DETAILS
                </h4>
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
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
