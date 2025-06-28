import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemsList from './ItemsList';
import InventoryDashboard from './InventoryDashboard';
import InventoryHeader from './components/InventoryHeader';
import InventorySidebar from './components/InventorySidebar';
import AddItemForm from './AddItemList';

function Inventory() {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'items': return <ItemsList />;
      case 'additems': return <AddItemForm />;
    //   case 'patients': return <Patients />;
    //   case 'calendar': return <CalendarSection />;
    //   case 'appointments': return <Appointments />;
    //   case 'prescription': return <PrescriptionForm />;
      default: return <InventoryDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <InventorySidebar activeKey={section} onChange={setSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <InventoryHeader doctorName="Dr. Kawasaki" />
        <main className="p-6 flex-1 overflow-auto">
          {renderSection()}
        </main>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Inventory;