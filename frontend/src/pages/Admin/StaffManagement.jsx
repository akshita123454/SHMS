import React, {
  useEffect,
  useState,
  useCallback,
  useReducer,
  useMemo,
} from "react";
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialFormState = {
  name: "",
  role: "",
  department: "",
  email: "",
  contact: "",
  password: "",
  ctc: "",
};

const initialDetailsState = {
  pfAccount: "",
  bankAccount: "",
  esicNumber: "",
  designation: "",
  joiningDate: "",
  location: "",
  isMetroCity: false,
  bonuses: 0,
  emergencyContact: "",
  previousExperience: "",
  bloodGroup: "",
  otherAllowance: 0,
  basic: 0,
  specialAllowance: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
};

const detailsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialDetailsState;
    case "SET_DETAILS":
      return { ...action.payload };
    default:
      return state;
  }
};

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, dispatchForm] = useReducer(formReducer, initialFormState);
  const [detailsFormData, dispatchDetails] = useReducer(
    detailsReducer,
    initialDetailsState
  );
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [selectedStaffForDetails, setSelectedStaffForDetails] = useState(null);
  const [generatedPayslip, setGeneratedPayslip] = useState(null);
  const [isDetailsEditable, setIsDetailsEditable] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, []);

  const loadStaff = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchStaff();
      setStaffList(data || []);
    } catch (err) {
      console.error("Error loading staff:", err);
      showToast("Failed to load staff", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const loadDepartmentsByRole = useCallback(
    async (role) => {
      if (!role) {
        setDepartments([]);
        dispatchForm({ type: "UPDATE_FIELD", field: "department", value: "" });
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await fetchDepartmentByRole(role);
        setDepartments(data || []);
        if (!data.includes(formData.department)) {
          dispatchForm({
            type: "UPDATE_FIELD",
            field: "department",
            value: "",
          });
        }
      } catch (err) {
        console.error("Error loading departments:", err);
        showToast("Failed to load departments", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [formData.department, showToast]
  );

  useEffect(() => {
    loadStaff();
    setCurrentStep(0);
  }, [loadStaff]);

  useEffect(() => {
    loadDepartmentsByRole(formData.role);
  }, [formData.role, loadDepartmentsByRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatchDetails({
      type: "UPDATE_FIELD",
      field: name,
      value:
        type === "checkbox"
          ? checked
          : name === "isMetroCity"
          ? value === "true"
          : name === "basic" || name === "specialAllowance"
          ? parseFloat(value) || 0 // Ensure numeric values
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (editingId) {
        await updateStaff(editingId, formData);
        showToast("Staff updated successfully!");
      } else {
        await addStaff(formData);
        showToast("Staff added successfully!");
      }
      dispatchForm({ type: "RESET" });
      setEditingId(null);
      await loadStaff();
      setCurrentStep(1);
    } catch (err) {
      console.error("Error saving staff:", err);
      showToast(
        `Error: ${err.response?.data?.message || err.message}`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (staff) => {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "name",
      value: staff.name || "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "role",
      value: staff.role || "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "department",
      value: staff.department || "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "email",
      value: staff.email || "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "contact",
      value: staff.contact || "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "password",
      value: "",
    });
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "ctc",
      value: staff.ctc || "",
    });
    setEditingId(staff._id);
    setCurrentStep(0);
  };

  const handleDelete = async (id) => {
    if (isLoading) return;
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setIsLoading(true);
      try {
        await deleteStaff(id);
        showToast("Staff deleted successfully!");
        await loadStaff();
      } catch (err) {
        console.error("Error deleting staff:", err);
        showToast(
          `Error: ${err.response?.data?.message || err.message}`,
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmployeeIdClick = (staff) => {
    setSelectedStaffForDetails(staff);
    dispatchDetails({
      type: "SET_DETAILS",
      payload: {
        pfAccount: staff.pfAccount || "",
        bankAccount: staff.bankAccount || "",
        esicNumber: staff.esicNumber || "",
        designation: staff.designation || "",
        joiningDate: staff.joiningDate
          ? new Date(staff.joiningDate).toISOString().split("T")[0]
          : "",
        location: staff.location || "",
        isMetroCity: staff.isMetroCity || false,
        bonuses: staff.bonuses || 0,
        emergencyContact: staff.emergencyContact || "",
        previousExperience: staff.previousExperience || "",
        bloodGroup: staff.bloodGroup || "",
        otherAllowance: staff.otherAllowance || 0,
        basic: staff.basic || 0,
        specialAllowance: staff.specialAllowance || 0,
      },
    });
    setGeneratedPayslip(null);
    setIsDetailsEditable(!staff.payrollGenerated);
    setCurrentStep(2);
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedStaff = { ...selectedStaffForDetails, ...detailsFormData };
      console.log("Saving staff details:", updatedStaff); // Log data sent to backend
      await updateStaff(selectedStaffForDetails._id, updatedStaff);
      showToast("Staff details updated successfully!");
      setSelectedStaffForDetails(updatedStaff);
      await loadStaff();
    } catch (err) {
      console.error("Error saving staff details:", err);
      showToast(
        `Error: ${err.response?.data?.message || err.message}`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePayslip = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await addPayroll({
        staffId: selectedStaffForDetails._id,
        month: new Date().toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        }),
      });
      console.log("Generated payslip data:", response.data); // Log payslip data
      setGeneratedPayslip(response.data);
      setIsDetailsEditable(false);
      showToast("Payslip generated successfully!");
      await loadStaff();
    } catch (err) {
      console.error("Error generating payslip:", err);
      showToast(
        `Error: ${err.response?.data?.message || err.message}`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedStaffForDetails(null);
    setGeneratedPayslip(null);
    setIsDetailsEditable(true);
    dispatchDetails({ type: "RESET" });
    setCurrentStep(1);
  };

  const memoizedStaffList = useMemo(() => staffList, [staffList]);

  return (
    <div className="p-6 space-y-6 w-full bg-gray-100 min-h-screen font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Staff Management
      </h2>

      {toast.message && (
        <div
          className={`px-4 py-2 rounded-lg mb-4 text-center ${
            toast.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      {isLoading && (
        <div className="text-center text-gray-600">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => {
            setCurrentStep(0);
            setEditingId(null);
            dispatchForm({ type: "RESET" });
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
            currentStep === 0
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } disabled:opacity-50`}
          disabled={isLoading}
          aria-label="Navigate to Add/Edit Staff"
        >
          Add/Edit Staff
        </button>
        <button
          onClick={() => {
            setCurrentStep(1);
            setSelectedStaffForDetails(null);
            setGeneratedPayslip(null);
            setIsDetailsEditable(true);
            dispatchDetails({ type: "RESET" });
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
            currentStep === 1
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } disabled:opacity-50`}
          disabled={isLoading}
          aria-label="Navigate to Staff List"
        >
          Staff List
        </button>
      </div>

      {currentStep === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Staff" : "Add New Staff"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            aria-label={editingId ? "Edit staff form" : "Add new staff form"}
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={isLoading}
                aria-required="true"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={isLoading}
                aria-required="true"
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
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="department"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={!formData.role || isLoading}
                aria-required="true"
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
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={isLoading}
                aria-required="true"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={isLoading}
                aria-required="true"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required={!editingId}
                disabled={isLoading}
                aria-required={!editingId}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="ctc"
              >
                CTC (Cost to Company)
              </label>
              <input
                type="number"
                id="ctc"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
                disabled={isLoading}
                aria-required="true"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isLoading}
                aria-label={editingId ? "Update staff" : "Add staff"}
              >
                {editingId ? "Update Staff" : "Add Staff"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    dispatchForm({ type: "RESET" });
                  }}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label="Cancel edit"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Existing Staff
          </h3>
          {memoizedStaffList.length === 0 ? (
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
                  {memoizedStaffList.map((staff) => (
                    <tr key={staff._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.name || "N/A"}
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-200 text-sm text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleEmployeeIdClick(staff)}
                        aria-label={`View details for ${staff.name}`}
                      >
                        {staff.employeeId || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.role || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.department || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        {staff.email || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                        ₹{staff.ctc?.toLocaleString() || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2 transition duration-300 disabled:bg-yellow-300 disabled:cursor-not-allowed"
                          disabled={isLoading}
                          aria-label={`Edit ${staff.name}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 disabled:bg-red-300 disabled:cursor-not-allowed"
                          disabled={isLoading}
                          aria-label={`Delete ${staff.name}`}
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

      {currentStep === 2 && selectedStaffForDetails && (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl mx-auto mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Staff Details: {selectedStaffForDetails.name || "N/A"} (
            {selectedStaffForDetails.employeeId || "N/A"})
          </h3>

          <div className="mb-6 p-4 border rounded-lg bg-gray-50 overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700 w-1/2">
                    Name:
                  </td>
                  <td className="py-2 px-2 text-gray-800 w-1/2">
                    {selectedStaffForDetails.name || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Employee ID:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.employeeId || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Role:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.role || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Department:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.department || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Email:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.email || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    Contact:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    {selectedStaffForDetails.contact || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold text-gray-700">
                    CTC:
                  </td>
                  <td className="py-2 px-2 text-gray-800">
                    ₹{selectedStaffForDetails.ctc?.toLocaleString() || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!generatedPayslip && (
            <form
              onSubmit={handleSaveDetails}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              aria-label="Staff details form"
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="pfAccount"
                >
                  PF Account
                </label>
                <input
                  type="text"
                  id="pfAccount"
                  name="pfAccount"
                  value={detailsFormData.pfAccount}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="bankAccount"
                >
                  Bank Account
                </label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  value={detailsFormData.bankAccount}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="esicNumber"
                >
                  ESIC Number
                </label>
                <input
                  type="text"
                  id="esicNumber"
                  name="esicNumber"
                  value={detailsFormData.esicNumber}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="designation"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={detailsFormData.designation}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="joiningDate"
                >
                  Joining Date
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={detailsFormData.joiningDate}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={detailsFormData.location}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="isMetroCity"
                >
                  HRA City Type
                </label>
                <select
                  id="isMetroCity"
                  name="isMetroCity"
                  value={detailsFormData.isMetroCity}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                >
                  <option value={false}>Non-Metro City</option>
                  <option value={true}>Metro City</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="bonuses"
                >
                  Bonuses
                </label>
                <input
                  type="number"
                  id="bonuses"
                  name="bonuses"
                  value={detailsFormData.bonuses}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="otherAllowance"
                >
                  Other Allowance
                </label>
                <input
                  type="number"
                  id="otherAllowance"
                  name="otherAllowance"
                  value={detailsFormData.otherAllowance}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="emergencyContact"
                >
                  Emergency Contact
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={detailsFormData.emergencyContact}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="previousExperience"
                >
                  Previous Experience
                </label>
                <input
                  type="text"
                  id="previousExperience"
                  name="previousExperience"
                  value={detailsFormData.previousExperience}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="bloodGroup"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={detailsFormData.bloodGroup}
                  onChange={handleDetailsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={!isDetailsEditable || isLoading}
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    aria-label="Save staff details"
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
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold disabled:bg-green-300 disabled:cursor-not-allowed"
                disabled={!isDetailsEditable || isLoading}
                aria-label="Generate financial details"
              >
                Generate Financial Details
              </button>
            )}
            <button
              onClick={handleCloseDetails}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 text-lg font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={isLoading}
              aria-label="Close staff details"
            >
              Close
            </button>
          </div>

          {generatedPayslip && (
            <div className="mt-8 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Generated Details
              </h4>
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

              <div className="mb-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Employee ID:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.employeeId || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Month:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.month || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Name:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {selectedStaffForDetails.name || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Joining Date:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.joiningDate
                          ? new Date(
                              generatedPayslip.joiningDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Designation:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.designation || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Bank Account:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.bankAccount || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        Location:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.location || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-700">
                        PF Account:
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                        {generatedPayslip.pfAccount || "N/A"}
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
                        {generatedPayslip.esicNumber || "N/A"}
                      </td>
                    </tr>
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

              <div className="space-y-6 bg-white p-6 shadow rounded">
                <h3 className="text-xl font-semibold">
                  Generated Payslip - Editable Fields
                </h3>
                <form
                  onSubmit={handleSaveDetails}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="basic"
                    >
                      Basic Salary
                    </label>
                    <input
                      type="number"
                      id="basic"
                      name="basic"
                      value={detailsFormData.basic}
                      onChange={handleDetailsChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="specialAllowance"
                    >
                      Special Allowance
                    </label>
                    <input
                      type="number"
                      id="specialAllowance"
                      name="specialAllowance"
                      value={detailsFormData.specialAllowance}
                      onChange={handleDetailsChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      aria-label="Save payslip changes"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {generatedPayslip.earnings?.map((earning, i) => (
                        <tr key={i}>
                          <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                            {earning.type || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                            {typeof earning.total === "number"
                              ? earning.total.toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-bold">
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                          Gross Pay
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          ₹
                          {typeof generatedPayslip.grossPay === "number"
                            ? generatedPayslip.grossPay.toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

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
                        ?.filter((d) => d.type !== "Professional Tax")
                        .map((deduction, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                              {deduction.type || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                              {typeof deduction.amount === "number"
                                ? deduction.amount.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-gray-100 font-bold">
                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                          Net Pay
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                          ₹
                          {typeof generatedPayslip.netPay === "number"
                            ? generatedPayslip.netPay.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="font-bold text-blue-600 mt-1 text-right">
                    ({generatedPayslip.netPayInWords || "N/A"})
                  </p>
                </div>
              </div>

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
                        {generatedPayslip.exemptions?.map((x, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                              {x.label || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                              {typeof x.value === "number"
                                ? x.value.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
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
                        {generatedPayslip.investments?.map((x, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                              {x.label || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                              {typeof x.value === "number"
                                ? x.value.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
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
                        {generatedPayslip.slabWiseTax?.map((x, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                              {x.label || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                              {typeof x.value === "number"
                                ? x.value.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
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
                        {generatedPayslip.taxDeductedDetails?.map((x, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                              {x.label || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-gray-800">
                              {typeof x.value === "number"
                                ? x.value.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
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
