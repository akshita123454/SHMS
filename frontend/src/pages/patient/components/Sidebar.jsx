import {
  UserCircle,
  Stethoscope,
  Bell,
  MessageSquare,
  FileText,
  FileBarChart2,
  History,
  CalendarDays,
  LogOut,
} from "lucide-react";

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



const Sidebar = ({activeKey,onChange}) => {

  const items = [
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
  ];


  return (
     <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Patient Panel</h2>
        <p className="mb-6 text-sm text-center">
          Role: <span className="font-medium">Patient</span>
        </p>

        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => onChange(item.key)}
                className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                  activeKey === item.key
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <LogoutButton/>
        {/* <button
          onClick={() => console.log("Logout")}
          className="w-full text-center text-red-400 hover:text-red-500 flex items-center justify-center gap-2 py-2 mt-6"
        >
          <LogOut size={18} />
          Logout
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;
