import "./App.css";
import DoctorPage from "./pages/Doctor/Doctor";
// import  Sidebar  from './pages/patient/components/Sidebar'

import PatientLayout from "./pages/patient/PatientLayout";
import NotificationList from "./pages/patient/components/NotificationList";
import MessageSection from "./pages/patient/components/MessageSection";
import Reports from "./pages/patient/components/Reports";
import MedicalHistory from "./pages/patient/components/MedicalHistory";
import AppointmentForm from "./pages/patient/components/AppointmentForm";
import AppointmentHistory from "./pages/patient/components/AppointmentHistory";
import ProfileCard from "./pages/patient/components/ProfileCard";
import MyCalendar from "./pages/patient/components/Calendar"; 


import RegisterPatient from "./pages/reception/RegisterPatient"
import Appointments from "./pages/reception/Appointments"
import Billing from "./pages/reception/Billing"
import RoomAndBed from "./pages/reception/RoomAndBed"
import DoctorAvailability from "./pages/reception/DoctorAvailability"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ReceptionLayout from "./pages/reception/components/layout/ReceptionLayout";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/doctor" element={<DoctorPage />} />


            <Route path="/" element={<PatientLayout />}>
                <Route path="profile" element={<ProfileCard />} />
                <Route path="appointment" element={<AppointmentForm />} />
                <Route path="notification" element={<NotificationList />} />
                <Route path="message" element={<MessageSection />} />
                <Route path="history" element={<MedicalHistory />} />
                <Route path="reports" element={<Reports />} />
                <Route path="appointment-history" element={<AppointmentHistory />} />
              
                <Route path="calendar" element={<MyCalendar />} />
            </Route>

            <Route path="/reception/register" element={<RegisterPatient />} />
            <Route path="/reception/appointments" element={<Appointments />} />
            <Route path="/reception/billing" element={<Billing />} />
            <Route path="/reception/room-bed" element={<RoomAndBed />} />
            <Route path="/reception/doctor-availability" element={<DoctorAvailability />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
