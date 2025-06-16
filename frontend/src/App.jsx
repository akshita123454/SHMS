// src/App.jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Doctor from "./pages/Doctor";
import Test from "./pages/Test";

import PatientLayout from "./pages/patient/PatientLayout";
import NotificationList from "./pages/patient/components/NotificationList";
import MessageSection from "./pages/patient/components/MessageSection";
import Reports from "./pages/patient/components/Reports";
import MedicalHistory from "./pages/patient/components/MedicalHistory";
import AppointmentForm from "./pages/patient/components/AppointmentForm";
import AppointmentHistory from "./pages/patient/components/AppointmentHistory";
import ProfileCard from "./pages/patient/components/ProfileCard";
import MyCalendar from "./pages/patient/components/Calendar"; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/hello" element={<Doctor />} />
          <Route path="/test" element={<Test />} />

          <Route path="/" element={<PatientLayout />}>
            <Route path="profile" element={<ProfileCard />} />
            <Route path="appointment" element={<AppointmentForm />} />
            <Route path="notification" element={<NotificationList />} />
            <Route path="message" element={<MessageSection />} />
            <Route path="history" element={<MedicalHistory />} />
            <Route path="reports" element={<Reports />} />
            <Route path="appointment-history" element={<AppointmentHistory />} />
           
            <Route path="/calendar" element={<MyCalendar />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;