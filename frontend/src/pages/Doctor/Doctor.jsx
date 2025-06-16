import Reviews from './reviews';
import { useState } from 'react';
import Patients from './PatientList';
import Header from './components/Header';
import Appointments from './Appointment';   
import CalendarSection from './Calender';
import Dashboard from './DoctorDashboard';
import Sidebar from './components/Sidebar';
import PrescriptionForm from './Prescription';
// import Staff from './components/sections/Staff';
// import Settings from './components/sections/Settings';
// import Surgeries from './components/sections/Surgeries';
// import TestReferralsForm from './components/TestReferralsForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorPage() {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'reviews': return <Reviews />;
      case 'patients': return <Patients />;
      case 'calendar': return <CalendarSection />;
      case 'appointments': return <Appointments />;
      case 'prescription': return <PrescriptionForm />;
      default: return <Dashboard />;
    //   case 'surgeries': return <Surgeries />;
    //   case 'staff': return <Staff />;
    //   case 'settings': return <Settings />;
    //   case 'tests': return <TestReferralsForm />;
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