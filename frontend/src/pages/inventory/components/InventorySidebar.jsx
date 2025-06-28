import { Users, Star, MessageCircle, Calendar,  FileText, LogOut, HomeIcon } from 'lucide-react';
import LogoutButton from '../../../utils/LogoutButton';

const items = [
  { key: '/', icon: <HomeIcon />, label: 'DashBoard' }, 
  { key: 'items', icon: <MessageCircle />, label: 'items' },
  { key: 'additems', icon: <MessageCircle />, label: 'additems' },
  // { key: 'prescription', icon: <FileText />, label: 'Prescription' },
  // { key: 'calendar', icon: <Calendar />, label: 'Calendar' },
  // { key: 'patients', icon: <Users />, label: 'Patients' },
  // { key: 'reviews', icon: <Star />, label: 'Reviews' }, 
];

export default function InventorySidebar({ activeKey, onChange }) {
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
        <LogoutButton/>
      </div>
    </aside>
  );
}