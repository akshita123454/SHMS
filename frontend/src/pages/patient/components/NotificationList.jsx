// src/pages/patient/components/NotificationList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const statusStyle = {
  Confirmed: "bg-green-600 text-white",
  New: "bg-blue-600 text-white",
  Cancelled: "bg-red-600 text-white",
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patients/all-notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🔔 Notifications</h2>
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n, idx) => (
            <div key={idx} className="flex justify-between items-center border p-3 rounded">
              <div>
                <p className="text-sm">{n.content}</p>
                <p className="text-xs text-gray-500">{n.patientName} — {new Date(n.date).toLocaleString()}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${
                  statusStyle[n.status] || "bg-gray-400 text-white"
                }`}
              >
                {n.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No notifications found.</div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
