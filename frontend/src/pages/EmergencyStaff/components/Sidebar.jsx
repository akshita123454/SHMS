import {
  Activity,
  Bell,
  Ambulance,
  BedDouble,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import LogoutButton from '../../../utils/LogoutButton';

const items = [
  { key: 'triage', icon: <Activity className="w-5 h-5" />, label: 'Triage' },
  { key: 'ambulance', icon: <Ambulance className="w-5 h-5" />, label: 'Ambulance Tracker' },
  { key: 'notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
  { key: 'room-allotment', icon: <BedDouble className="w-5 h-5" />, label: 'Room Allotment' },
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
          <h1 className="text-xl font-bold tracking-tight">Emergency</h1>
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



//  OLD CODE

// import {
//   Activity,
//   Bell,
//   Ambulance,
//   BedDouble,
//   LogOut
// } from 'lucide-react';

// import LogoutButton from '../../../utils/LogoutButton'

// const items = [
//   { key: 'triage', icon: <Activity />, label: 'Triage' },
//   { key: 'ambulance', icon: <Ambulance />, label: 'Ambulance Tracker' },
//   { key: 'notifications', icon: <Bell />, label: 'Notifications' },
//   { key: 'room-allotment', icon: <BedDouble />, label: 'Room Allotment' },
// ];

// export default function Sidebar({ activeKey, onChange }) {
//   return (
//     <aside className="w-60 bg-gray-800 text-white flex flex-col p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Emergency</h1>
//       <div className="flex-1 flex flex-col justify-between">
//         <nav className="space-y-2">
//           {items.map(item => (
//             <button
//               key={item.key}
//               onClick={() => onChange(item.key)}
//               className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition ${activeKey === item.key ? 'bg-gray-700' : '' }`}
//             >
//               <span className="mr-3">{item.icon}</span>{item.label}
//             </button>
//           ))}
//         </nav>
//         <LogoutButton/>
//         {/* <button
//           onClick={() => console.log('Logout')}
//           className="flex items-center bg-red-600 w-full p-2 rounded-lg hover:bg-red-700 transition mt-6"
//         >
//           <span className="mr-2"><LogOut /></span>Logout
//         </button> */}
//       </div>
//     </aside>
//   );
// }
