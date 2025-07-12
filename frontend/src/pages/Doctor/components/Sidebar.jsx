import {
  Users,
  Star,
  MessageCircle,
  Calendar,
  FileText,
  HomeIcon,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from 'lucide-react';
import { useState } from 'react';
import LogoutButton from '../../../utils/LogoutButton';


const items = [
  { key: '/', icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard' },
  { key: 'appointments', icon: <MessageCircle className="w-5 h-5" />, label: 'Appointments' },
  { key: 'prescription', icon: <FileText className="w-5 h-5" />, label: 'Prescription' },
  { key: 'calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
  { key: 'patients', icon: <Users className="w-5 h-5" />, label: 'Patients' },
  { key: 'reviews', icon: <Star className="w-5 h-5" />, label: 'Reviews' },
  { key: 'chats', icon: <Cloud className="w-5 h-5" />, label: 'Chats' },
];

export default function Sidebar({ activeKey, onChange }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-blue-50 text-blue-900 border-r border-blue-200 min-h-screen transition-all duration-300 flex flex-col p-4`}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-tight">DOCTOR</h1>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-blue-700 hover:text-blue-900"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition-all
              ${
                activeKey === item.key
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'hover:bg-blue-100'
              }`}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
}
