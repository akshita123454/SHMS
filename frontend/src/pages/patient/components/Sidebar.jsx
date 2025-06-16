// src/pages/patient/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ setSection }) => (
  <div className="sidebar">
    <h2>SHMS</h2>
    <ul>
      <li><button onClick={() => setSection("profile")}>Profile</button></li>
      <li><button onClick={() => setSection("appointment")}>Book Appointment</button></li>
      <li><button onClick={() => setSection("messages")}>Messages</button></li>
    </ul>
  </div>
);

export default Sidebar;