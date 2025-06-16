// src/pages/patient/components/NotificationList.jsx
import React from "react";

const NotificationList = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🔔 Notifications</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center border p-3 rounded">
          <span>Appointment confirmed for 2025-05-28.</span>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Confirmed</span>
        </div>
        <div className="flex justify-between items-center border p-3 rounded">
          <span>New report uploaded.</span>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">New</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
