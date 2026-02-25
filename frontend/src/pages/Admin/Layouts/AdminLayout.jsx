// src/layouts/AdminLayout.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import Admin-specific Header and Sidebar from their nested 'components' folder
import AdminSidebar from "../Components/AdminSidebar"; // Path adjusted
import AdminHeader from "../Components/AdminHeader"; // Path adjusted

// Import Admin content pages from their DIRECT location inside src/pages/Admin/
import Dashboard from "../Dashboard"; // Path adjusted
import StaffManagement from "../StaffManagement"; // Path adjusted
import Inventory from "../Inventory"; // Path adjusted
import Payroll from "../Payroll"; // Path adjusted
import AmbulanceTracking from "../AmbulanceTracking"; // Path adjusted
import RoomManagement from "../RoomManagement";
const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Admin Sidebar */}
      <AdminSidebar />

      <div className="main-content flex-1 p-8">
        {/* Admin Header */}
        <AdminHeader />

        <Routes>
          {/* Routes nested under /admin/ */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="ambulance" element={<AmbulanceTracking />} />
          <Route path="rooms" element={<RoomManagement />} />
          <Route
            path="*"
            element={
              <div className="text-center p-10 text-red-500 font-bold text-2xl">
                Admin 404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
