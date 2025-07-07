import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RegisterPatient from './RegisterPatient';
import Appointments from './Appointments';
import Billing from './Billing';
import RoomAndBed from './RoomAndBed';
import DoctorAvailability from './DoctorAvailability';
import Sanitation from './Sanitation';
import StaffAttendance from './StaffAttendance';
import RegisteredPatients from './RegisteredPatients';


function ReceptionPage() {
  const [section, setSection] = useState('register');

  const renderSection = () => {
    switch (section) {
      case 'appointments': return <Appointments />;
      case 'billing': return <Billing />;
      case 'room-bed': return <RoomAndBed />;
      case 'doctor-availability': return <DoctorAvailability />;
      case 'sanitation': return <Sanitation />;
      case 'staff-attendance': return <StaffAttendance />;
      case 'registered-patients': return <RegisteredPatients />;
      default: return <RegisterPatient />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <Sidebar activeKey={section} onChange={setSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 flex-1 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default ReceptionPage;
