// src/pages/Admin/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar p-6">
      <h1 className="text-2xl font-bold mb-8">SHMS Admin</h1>

      <nav className="space-y-2">
        {" "}
        {/* space-y-2 expects block children */}
        <Link
          to="/admin/dashboard"
          className={`nav-item ${isActive("/admin/dashboard") ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/staff"
          className={`nav-item ${isActive("/admin/staff") ? "active" : ""}`}
        >
          Staff Management
        </Link>
        <Link
          to="/admin/inventory"
          className={`nav-item ${isActive("/admin/inventory") ? "active" : ""}`}
        >
          Inventory
        </Link>
        <Link
          to="/admin/payroll"
          className={`nav-item ${isActive("/admin/payroll") ? "active" : ""}`}
        >
          Payroll
        </Link>
        <Link
          to="/admin/emergency"
          className={`nav-item ${isActive("/admin/emergency") ? "active" : ""}`}
        >
          Emergency Cases
        </Link>
        <Link
          to="/admin/reports"
          className={`nav-item ${isActive("/admin/reports") ? "active" : ""}`}
        >
          Reports
        </Link>
        <Link
          to="/admin/ambulance"
          className={`nav-item ${isActive("/admin/ambulance") ? "active" : ""}`}
        >
          Ambulance Tracking
        </Link>
        <div
          className="nav-item logout"
          onClick={() => alert("Logging out Admin...")}
        >
          Logout
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
