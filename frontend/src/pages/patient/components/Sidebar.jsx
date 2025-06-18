// src/pages/patient/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "Notification", path: "/notification" },
    { name: "Message", path: "/message" },
    { name: "Appointment History", path: "/appointment-history" },
    { name: "Medical History", path: "/history" },
    { name: "Reports", path: "/reports" },
    { name: "Calendar", path: "/calendar" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">SHMS</h2>
        <p className="mb-6 text-sm">User: <br /> <span className="font-medium">Patient</span></p>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-teal-500 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <NavLink
          to="/logout"
          className="block text-center text-red-400 hover:text-red-500"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
