  // src/pages/patient/PatientLayout.jsx
  import React, { useState } from "react";
  import Sidebar from "./components/Sidebar";
  import AppointmentForm from "./components/AppointmentForm";
  import ProfileForm from "./components/Profileform";
  import MessageSection from "./components/MessageSection";
  import "./PatientLayout.css";
  import AppointmentHistory from "./components/AppointmentHistory";
  import MedicalHistory from "./components/MedicalHistory";
  
  const SECTION_LABELS = {
    profile: "Welcome Patient",
    appointment: "",
    messages: "Messages",
    history: "Appointment History" // Add this line
  };
  
  const PatientLayout = () => {
    const [section, setSection] = useState("profile");
  
    return (
      <div className="flex patient-layout-container ">
        <Sidebar setSection={setSection} activeSection={section} />
        <div className="flex-1 p-4 patient-content-area">
          <h1 className="section-heading">{SECTION_LABELS[section]}</h1>
          <div className="section-content">
            {section === "profile" && <ProfileForm />}
            {section === "appointment" && <AppointmentForm />}
            {section === "messages" && <MessageSection />}
            {section === "history" && <AppointmentHistory />} {/* Add this line */}
            {section === "medicalHistory" && <MedicalHistory />} {/* Add this line */}
          </div>
        </div>
      </div>
    );
  };export default PatientLayout;