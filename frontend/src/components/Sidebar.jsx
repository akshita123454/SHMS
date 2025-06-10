
// File: src/components/Sidebar.jsx
import React from 'react';
import { Home, Users, Star, MessageCircle, HeartPulse, Calendar, CheckSquare, Settings, FileText, TestTube } from 'lucide-react';

const items = [
//   { key: 'dashboard', icon: <Home />, label: 'Dashboard' },
  { key: 'patients', icon: <Users />, label: 'Patients' },
  { key: 'reviews', icon: <Star />, label: 'Reviews' },
  { key: 'appointments', icon: <MessageCircle />, label: 'Appointments' },
//   { key: 'surgeries', icon: <HeartPulse />, label: 'Surgeries' },
  { key: 'calendar', icon: <Calendar />, label: 'Calendar' },
//   { key: 'staff', icon: <CheckSquare />, label: 'Staff' },
//   { key: 'settings', icon: <Settings />, label: 'Settings' },
  { key: 'prescription', icon: <FileText />, label: 'Prescription' },
//   { key: 'tests', icon: <TestTube />, label: 'Tests / Referrals' }
];

export default function Sidebar({ activeKey, onChange }) {
  return (
    <aside className="w-60 bg-gray-800 text-white flex flex-col p-6">
      <h1 className="text-3xl font-bold text-center mb-8">SHMS</h1>
      <div className="flex-1 flex flex-col justify-between">
        <nav className="space-y-2">
          {items.map(item => (
            <button key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition ${activeKey===item.key ? 'bg-gray-700' : ''}`}>
              <span className="mr-3">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => console.log('Logout')} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition mt-6">
          <span className="mr-2">🔓</span>Logout
        </button>
      </div>
    </aside>
  );
}
