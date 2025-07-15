import React, { useEffect, useState } from "react";
import {
fetchStaff,
addStaff,
updateStaff,
deleteStaff,
fetchDepartmentByRole,
} from "../../api/admin/staff.api.js";
import { addPayroll } from "../../api/admin/payroll.api.js";

// Reverted rolesList to include 'patient' and 'developer' based on original user.model.js enum
const rolesList = [
"admin",
"doctor",
"reception",
"patient",
"developer",
"emergency",
];

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
// Removed showDetailsModal as it will no longer be a modal
const [selectedStaffForDetails, setSelectedStaffForDetails] = useState(null);
const [detailsFormData, setDetailsFormData] = useState({
pfAccount: "",
bankAccount: "",
esicNumber: "",
designation: "",
joiningDate: "",
location: "",
isMetroCity: false,
hostelAllowance: 0,
childEducationAllowance: 0,
bonuses: 0,
});
const [generatedPayslip, setGeneratedPayslip] = useState(null);
const [isDetailsEditable, setIsDetailsEditable] = useState(true); // To control editability

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
[name]: type === "checkbox" ? checked : name === "isMetroCity" ? value === "true" : value,
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
loadStaff();
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
setEditingId(staff.\_id);
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
hostelAllowance: staff.hostelAllowance || 0,
childEducationAllowance: staff.childEducationAllowance || 0,
bonuses: staff.bonuses || 0,
});
setGeneratedPayslip(null); // Reset generated payslip
setIsDetailsEditable(!staff.payrollGenerated); // Set editability based on payrollGenerated status
};

const handleSaveDetails = async (e) => {
e.preventDefault();
try {
const updatedStaff = { ...selectedStaffForDetails, ...detailsFormData };
await updateStaff(selectedStaffForDetails.\_id, updatedStaff);
showToast("Staff details updated successfully!");
setSelectedStaffForDetails(updatedStaff); // Update selected staff with new details
loadStaff(); // Reload staff list to reflect changes
} catch (err) {
console.error("Error saving staff details", err);
showToast(`Error: ${err.response?.data?.message || err.message}`);
}
};

const handleGeneratePayslip = async () => {
try {
const response = await addPayroll({
staffId: selectedStaffForDetails.\_id,
month: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }), // Current month and year
});
setGeneratedPayslip(response.data);
setIsDetailsEditable(false); // Make details non-editable after generating payslip
showToast("Payslip generated successfully!");
loadStaff(); // Reload staff list to update payrollGenerated status
} catch (err) {
console.error("Error generating payslip", err);
showToast(`Error: ${err.response?.data?.message || err.message}`);
}
};

const handleCloseDetails = () => {
setSelectedStaffForDetails(null);
setGeneratedPayslip(null);
setIsDetailsEditable(true); // Reset editability for next time
};

return (
<div className="flex flex-col min-h-screen bg-gray-100">
{/_ Header _/}
<header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
<h1 className="text-2xl font-bold">Hospital Management System</h1>
<nav>
<ul className="flex space-x-4">
<li>
<a href="#" className="hover:underline">
Dashboard
</a>
</li>
<li>
<a href="#" className="hover:underline">
Patients
</a>
</li>
<li>
<a href="#" className="hover:underline">
Appointments
</a>
</li>
<li>
<a href="#" className="hover:underline">
Staff
</a>
</li>
<li>
<a href="#" className="hover:underline">
Settings
</a>
</li>
</ul>
</nav>
</header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                  <i className="fas fa-home mr-2"></i> Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                  <i className="fas fa-user-md mr-2"></i> Doctors
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                  <i className="fas fa-user-nurse mr-2"></i> Nurses
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                  <i className="fas fa-users mr-2"></i> Staff Management
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                  <i className="fas fa-clipboard-list mr-2"></i> Appointments
                </a>

