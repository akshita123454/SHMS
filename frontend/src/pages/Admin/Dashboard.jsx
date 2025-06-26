// src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../api/admin/reports.api.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalStaff: 0,
    totalAmbulances: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };
    loadStats();
  }, []);

  return (
    <div className="dashboard-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard Overview
      </h2>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
          <span className="text-4xl font-bold">{stats.totalStaff}</span>
          <p className="text-lg">Total Staff</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg">
          <span className="text-4xl font-bold">{stats.totalAmbulances}</span>
          <p className="text-lg">Total Ambulances</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg">
          <span className="text-4xl font-bold">{stats.totalRooms}</span>
          <p className="text-lg">Total Rooms</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
          <span className="text-4xl font-bold">{stats.availableRooms}</span>
          <p className="text-lg">Available Rooms</p>
        </div>
        <div className="module-card flex flex-col items-center justify-center p-6 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
          <span className="text-4xl font-bold">{stats.occupiedRooms}</span>
          <p className="text-lg">Occupied Rooms</p>
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

        {/* Room Management */}
        <Link
          to="/admin/rooms"
          className="module-card block cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-red-600 mb-2">
            Room Management
          </h4>
          <p className="text-gray-600">
            View, assign and track available and occupied rooms.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
