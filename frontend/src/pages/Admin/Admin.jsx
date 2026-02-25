// Example of the component that would use these imports
import { useState } from "react";
import AdminHeader from "./Components/AdminHeader";
import AdminSidebar from "./Components/AdminSidebar";

import AmbulanceTracking from "./AmbulanceTracking";
import Dashboard from "./Dashboard";
import EmergencyCases from "./EmergencyCases";
import Inventory from "./Inventory";
import Payroll from "./Payroll";
import StaffManagement from "./StaffManagement";
import RoomAllotment from "../EmergencyStaff/RoomAllotment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPage() {
  // Or HospitalManagementPage, etc.
  const [section, setSection] = useState("dashboard"); // Default section

  const renderSection = () => {
    switch (section) {
      case "ambulance-tracking":
        return <AmbulanceTracking />;
      case "emergency-cases":
        return <EmergencyCases />;
      case "inventory":
        return <Inventory />;
      case "payroll":
        return <Payroll />;
      case "staff-management":
        return <StaffManagement />;
      case "room-allotment":
        return <RoomAllotment />;
      default:
        return <Dashboard />; // Default to the main Dashboard
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <Sidebar activeKey={section} onChange={setSection} userRole="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Hospital Admin" />
        <main className="p-6 flex-1 overflow-auto">{renderSection()}</main>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default AdminPage;
