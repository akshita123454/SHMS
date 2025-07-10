// ✅ PatientPage.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PatientDashboard from './PatientDashboard';
import ProfileCard from './ProfileCard';
import NotificationList from './NotificationList';
import MessageSection from './MessageSection';
import MedicalHistory from './MedicalHistory';
import Reports from './Reports';
import Calendar from './Calendar';
import AppointmentForm from './AppointmentForm';
import AppointmentHistory from './AppointmentHistory';

function PatientPage() {
  const [section, setSection] = useState('dashboard');

  // 🆕 State to store updated profile data
  const [profileData, setProfileData] = useState(null);

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <PatientDashboard setSection={setSection} profileData={profileData} />;
      case 'profile card':
        return <ProfileCard onProfileSubmit={setProfileData} setSection={setSection} />;
      case 'appointment':
        return <AppointmentForm />;
      case 'notification':
        return <NotificationList />;
      case 'message':
        return <MessageSection />;
      case 'history':
        return <MedicalHistory />;
      case 'reports':
        return <Reports />;
      case 'appointment-history':
        return <AppointmentHistory />;
      case 'calendar':
        return <Calendar />;
      default:
        return <PatientDashboard setSection={setSection} profileData={profileData} />;
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

export default PatientPage;
