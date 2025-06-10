// Directory: src/

// File: src/App.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Dashboard from './DoctorDashboard';
import Patients from './PatientList';
import Reviews from './reviews';
import Appointments from './Appointment';   
// import Surgeries from './components/sections/Surgeries';
import CalendarSection from './Calender';
// import Staff from './components/sections/Staff';
// import Settings from './components/sections/Settings';
import PrescriptionForm from './Prescription';
// import TestReferralsForm from './components/TestReferralsForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorPage() {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'patients': return <Patients />;
      case 'reviews': return <Reviews />;
      case 'appointments': return <Appointments />;
    //   case 'surgeries': return <Surgeries />;
      case 'calendar': return <CalendarSection />;
    //   case 'staff': return <Staff />;
    //   case 'settings': return <Settings />;
      case 'prescription': return <PrescriptionForm />;
    //   case 'tests': return <TestReferralsForm />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <Sidebar activeKey={section} onChange={setSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header doctorName="Dr. Kawasaki" />
        <main className="p-6 flex-1 overflow-auto">
          {renderSection()}
        </main>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default DoctorPage;