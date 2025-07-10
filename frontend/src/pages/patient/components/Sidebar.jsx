import {
  UserCircle,
  Stethoscope,
  Bell,
  MessageSquare,
  FileText,
  FileBarChart2,
  History,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import Reports from './Reports';
import MyCalendar from './Calendar';
import ProfileCard from './ProfileCard';
import MedicalHistory from './MedicalHistory';
import MessageSection from './MessageSection';
import AppointmentForm from './AppointmentForm';
import NotificationList from './NotificationList';
import AppointmentHistory from './AppointmentHistory';
import LogoutButton from "../../../utils/LogoutButton";
import PatientDashboard from './PatientDashboard';
import { Gauge } from "lucide-react"; // icon



const Sidebar = ({ activeKey, onChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
// <<<<<<< superman
 {
    key: 'dashboard',
    icon: <Gauge />,  // Optional: import an icon for dashboard
    label: 'Dashboard',
    component: <PatientDashboard />,
  },
      
    {
      key: 'appointment',
      icon: <Stethoscope />,
      label: 'Appointment',
      component: <AppointmentForm />,
    },
    {
      key: 'notification',
      icon: <Bell />,
      label: 'Notifications',
      component: <NotificationList />,
    },
    {
      key: 'message',
      icon: <MessageSquare />,
      label: 'Messages',
      component: <MessageSection />,
    },
    {
      key: 'history',
      icon: <History />,
      label: 'Medical History',
      component: <MedicalHistory />,
    },
    {
      key: 'reports',
      icon: <FileBarChart2 />,
      label: 'Reports',
      component: <Reports />,
    },
    {
      key: 'appointment-history',
      icon: <FileText />,
      label: 'Appointment History',
      component: <AppointmentHistory />,
    },
    {
      key: 'calendar',
      icon: <CalendarDays />,
      label: 'Calendar',
      component: <MyCalendar />,
    },
// =======
//     { key: 'profile', icon: <UserCircle className="w-5 h-5" />, label: 'Profile', component: <ProfileCard /> },
//     { key: 'appointment', icon: <Stethoscope className="w-5 h-5" />, label: 'Appointment', component: <AppointmentForm /> },
//     { key: 'notification', icon: <Bell className="w-5 h-5" />, label: 'Notifications', component: <NotificationList /> },
//     { key: 'message', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', component: <MessageSection /> },
//     { key: 'history', icon: <History className="w-5 h-5" />, label: 'Medical History', component: <MedicalHistory /> },
//     { key: 'reports', icon: <FileBarChart2 className="w-5 h-5" />, label: 'Reports', component: <Reports /> },
//     { key: 'appointment-history', icon: <FileText className="w-5 h-5" />, label: 'Appointment History', component: <AppointmentHistory /> },
//     { key: 'calendar', icon: <CalendarDays className="w-5 h-5" />, label: 'Calendar', component: <MyCalendar /> },
// >>>>>>> main
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-blue-50 text-blue-900 border-r border-blue-200 min-h-screen transition-all duration-300 flex flex-col p-4`}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-tight">PATIENT</h1>
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
};

export default Sidebar;

















// old code 

// import {
//   UserCircle,
//   Stethoscope,
//   Bell,
//   MessageSquare,
//   FileText,
//   FileBarChart2,
//   History,
//   CalendarDays,
//   LogOut,
// } from "lucide-react";

// import Reports from './Reports';
// import MyCalendar from './Calendar';
// import ProfileCard from './ProfileCard';
// import MedicalHistory from './MedicalHistory';
// import MessageSection from './MessageSection';
// import AppointmentForm from './AppointmentForm';
// import NotificationList from './NotificationList';
// import AppointmentHistory from './AppointmentHistory';
// import LogoutButton from "../../../utils/LogoutButton";

// const Sidebar = ({activeKey,onChange}) => {

//   const items = [
//     {
//       key: 'profile',
//       icon: <UserCircle />,
//       label: 'Profile',
//       component: <ProfileCard />,
//     },
//     {
//       key: 'appointment',
//       icon: <Stethoscope />,
//       label: 'Appointment',
//       component: <AppointmentForm />,
//     },
//     {
//       key: 'notification',
//       icon: <Bell />,
//       label: 'Notifications',
//       component: <NotificationList />,
//     },
//     {
//       key: 'message',
//       icon: <MessageSquare />,
//       label: 'Messages',
//       component: <MessageSection />,
//     },
//     {
//       key: 'history',
//       icon: <History />,
//       label: 'Medical History',
//       component: <MedicalHistory />,
//     },
//     {
//       key: 'reports',
//       icon: <FileBarChart2 />,
//       label: 'Reports',
//       component: <Reports />,
//     },
//     {
//       key: 'appointment-history',
//       icon: <FileText />,
//       label: 'Appointment History',
//       component: <AppointmentHistory />,
//     },
//     {
//       key: 'calendar',
//       icon: <CalendarDays />,
//       label: 'Calendar',
//       component: <MyCalendar />,
//     },
//   ];


//   return (
//      <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
//       <div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Patient Panel</h2>
//         <p className="mb-6 text-sm text-center">
//           Role: <span className="font-medium">Patient</span>
//         </p>

//         <ul className="space-y-2">
//           {items.map((item) => (
//             <li key={item.key}>
//               <button
//                 onClick={() => onChange(item.key)}
//                 className={`flex items-center w-full px-4 py-2 rounded-md transition ${
//                   activeKey === item.key
//                     ? "bg-teal-600 text-white"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <LogoutButton/>
//         {/* <button
//           onClick={() => console.log("Logout")}
//           className="w-full text-center text-red-400 hover:text-red-500 flex items-center justify-center gap-2 py-2 mt-6"
//         >
//           <LogOut size={18} />
//           Logout
//         </button> */}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
