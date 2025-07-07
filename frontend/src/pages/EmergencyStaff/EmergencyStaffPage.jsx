import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Triage from './Triage';
import AmbulanceTracker from './AmbulanceTracker';
import Notifications from './Notifications';


function EmergencyStaffPage() {
  const [section, setSection] = useState('triage');

  const renderSection = () => {
    switch (section) {
      case 'triage': return <Triage />;
      case 'ambulance': return <AmbulanceTracker />;
      case 'notifications': return <Notifications />;
      default: return <Triage />;
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

export default EmergencyStaffPage;
