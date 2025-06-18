// src/pages/Admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard Overview
      </h2>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
          <span className="text-4xl font-bold">120+</span>
          <p className="text-lg">Total Staff</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <span className="text-4xl font-bold">450+</span>
          <p className="text-lg">Total Patients</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <span className="text-4xl font-bold">30+</span>
          <p className="text-lg">Critical Cases</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <span className="text-4xl font-bold">150+</span>
          <p className="text-lg">Daily Appointments</p>
        </div>
      </div>

      {/* System Modules Section - Now Clickable */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        System Modules
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Inventory Module */}
        <Link
          to="/admin/inventory"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-teal-600 mb-2">
            Inventory Module
          </h4>
          <p className="text-gray-600">
            Manage hospital supplies, equipment, and medical stock.
          </p>
        </Link>

        {/* Staff Management */}
        <Link
          to="/admin/staff"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-blue-600 mb-2">
            Staff Management
          </h4>
          <p className="text-gray-600">
            Handle staff records, roles, and attendance.
          </p>
        </Link>

        {/* Payroll */}
        <Link
          to="/admin/payroll"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-purple-600 mb-2">
            Payroll
          </h4>
          <p className="text-gray-600">
            Process salaries, deductions, and financial records for staff.
          </p>
        </Link>

        {/* Reports Panel */}
        <Link
          to="/admin/reports"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-red-600 mb-2">
            Reports Panel
          </h4>
          <p className="text-gray-600">
            Generate various reports on hospital operations and data.
          </p>
        </Link>

        {/* Ambulance Tracking */}
        <Link
          to="/admin/ambulance"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-yellow-600 mb-2">
            Ambulance Tracking
          </h4>
          <p className="text-gray-600">
            Monitor and manage ambulance movements and dispatches.
          </p>
        </Link>

        {/* Emergency Cases - Example for a module without a dedicated card yet, showing how to add */}
        {/* <Link to="/admin/emergency" className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <h4 className="text-xl font-semibold text-green-600 mb-2">Emergency Cases</h4>
                    <p className="text-gray-600">Track and manage emergency patient arrivals and treatment.</p>
                </Link> */}
      </div>

      {/* Recent Activities Section (Example - can be expanded) */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Recent Activities
      </h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">2 hours ago</span>
            <p className="text-gray-700">
              Dr. Smith updated patient record for Jane Doe.
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Yesterday</span>
            <p className="text-gray-700">
              New batch of surgical masks added to inventory.
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">2 days ago</span>
            <p className="text-gray-700">
              Ambulance A1 dispatched to accident scene.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
