// src/pages/patient/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Agar aap Font Awesome React component use kar rahe hain toh isko import karein
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCalendarPlus, faEnvelope, faHistory, faNotesMedical, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ setSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear auth tokens here
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <h2>SHMS</h2>
        <ul>
          <li>
            <button onClick={() => setSection("profile")}>
              {/* Icon for Profile */}
              <i className="fas fa-user"></i> {/* Font Awesome user icon */}
              {/* Agar Font Awesome React component use kar rahe hain: */}
              {/* <FontAwesomeIcon icon={faUser} /> */}
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => setSection("appointment")}>
              {/* Icon for Book Appointment */}
              <i className="fas fa-calendar-plus"></i> {/* Font Awesome calendar-plus icon */}
              {/* <FontAwesomeIcon icon={faCalendarPlus} /> */}
              Book Appointment
            </button>
          </li>
          <li>
            <button onClick={() => setSection("messages")}>
              {/* Icon for Messages */}
              <i className="fas fa-envelope"></i> {/* Font Awesome envelope icon */}
              {/* <FontAwesomeIcon icon={faEnvelope} /> */}
              Messages
            </button>
          </li>
          <li>
            <button onClick={() => setSection("history")}>
              {/* Icon for Appointment History */}
              <i className="fas fa-history"></i> {/* Font Awesome history icon */}
              {/* <FontAwesomeIcon icon={faHistory} /> */}
              Appointment History
            </button>
          </li>
           <li>
            <button onClick={() => setSection("medicalHistory")}>
              {/* Icon for Medical History */}
              <i className="fas fa-notes-medical"></i> {/* Font Awesome notes-medical icon */}
              {/* <FontAwesomeIcon icon={faNotesMedical} /> */}
              Medical History
            </button>
          </li>
        </ul>
      </div>
      <div className="translate-y-40">
      <button  class="text-danger"
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          marginBottom: "20px",
          marginLeft: "20px",
          padding: "10px 24px",
          background: "black",
          color: "#222",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: "pointer"
        }}> 
        Logout
      </button>
    </div>
    </div>
  );
};

export default Sidebar;