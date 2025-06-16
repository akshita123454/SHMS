// src/pages/patient/PatientLayout.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AppointmentForm from "./components/AppointmentForm";
import ProfileForm from "./components/Profileform";
import MessageSection from "./components/MessageSection";
import "./PatientLayout.css";

const SECTION_LABELS = {
  profile: "Profile",
  appointment: "Book Appointment",
  messages: "Messages",
};

const PatientLayout = () => {
  const [section, setSection] = useState("profile");

  return (
    <div className="flex patient-layout-container">
      <Sidebar setSection={setSection} activeSection={section} />
      <div className="flex-1 p-4">
        <h1 className="section-heading">{SECTION_LABELS[section]}</h1>
        <div className="section-content">
          {section === "profile" && <ProfileForm />}
          {section === "appointment" && <AppointmentForm />}
          {section === "messages" && <MessageSection />}
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;