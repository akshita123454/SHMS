import {
  UserPlus,
  CalendarCheck,
  FileText,
  BedDouble,
  UserCheck,
  LogOut,
  Home
} from 'lucide-react';

const items = [
  { key: 'register', icon: <UserPlus />, label: 'Register Patient' },
  { key: 'appointments', icon: <CalendarCheck />, label: 'Appointments' },
  { key: 'billing', icon: <FileText />, label: 'Billing' },
  { key: 'room-bed', icon: <BedDouble />, label: 'Room & Bed' },
  { key: 'doctor-availability', icon: <UserCheck />, label: 'Doctor Availability' },
];

export default function Sidebar({ activeKey, onChange }) {
  return (
    <aside className="w-60 bg-gray-800 text-white flex flex-col p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Reception</h1>
      <div className="flex-1 flex flex-col justify-between">
        <nav className="space-y-2">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition ${activeKey === item.key ? 'bg-gray-700' : ''}`}
            >
              <span className="mr-3">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => console.log('Logout')}
          className="flex items-center bg-red-600 w-full p-2 rounded-lg hover:bg-red-700 transition mt-6"
        >
          <span className="mr-2"><LogOut /></span>Logout
        </button>
      </div>
    </aside>
  );
}
