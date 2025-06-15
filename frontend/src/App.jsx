// src/App.jsx
import React from 'react';
import DoctorPage from "./pages/Doctor/Doctor";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPatient from './pages/reception/RegisterPatient';
import Appointments from './pages/reception/Appointments';
import Billing from './pages/reception/Billing';
import RoomAndBed from './pages/reception/RoomAndBed';
import DoctorAvailability from './pages/reception/DoctorAvailability';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default route */}
        <Route path="/" element={<RegisterPatient />} />
        <Route path="/doctor" element={<DoctorPage />} />
        {/* ✅ Other receptionist routes */}
        <Route path="/reception/register" element={<RegisterPatient />} />
        <Route path="/reception/appointments" element={<Appointments />} />
        <Route path="/reception/billing" element={<Billing />} />
        <Route path="/reception/room-bed" element={<RoomAndBed />} />
        <Route path="/reception/doctor-availability" element={<DoctorAvailability />} />
        
        {/* Optional: 404 fallback */}
        <Route path="*" element={<div className="p-6 text-xl">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
