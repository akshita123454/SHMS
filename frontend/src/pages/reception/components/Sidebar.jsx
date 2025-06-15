// src/components/reception/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  CalendarCheck,
  FileText,
  BedDouble,
  Stethoscope,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-gray-800 text-white fixed flex flex-col justify-between">
      
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center py-6">SHMS Reception</h1>
        <nav className="flex flex-col mt-6 px-4 space-y-2">
          <Link to="/reception/register" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <UserPlus className="w-5 h-5 mr-3" />
            Register Patient
          </Link>
          <Link to="/reception/appointments" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <CalendarCheck className="w-5 h-5 mr-3" />
            Appointments
          </Link>
          <Link to="/reception/billing" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <FileText className="w-5 h-5 mr-3" />
            Billing
          </Link>
          <Link to="/reception/room-bed" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <BedDouble className="w-5 h-5 mr-3" />
            Room & Bed
          </Link>
          <Link to="/reception/doctor-availability" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <Stethoscope className="w-5 h-5 mr-3" />
            Doctor Availability
          </Link>
        </nav>
      </div>

      {/* Sticky Logout Button */}
      <div className="px-4 mb-4">
        <button
          title="Logging out..."
          className="flex  bg-red-600 items-center w-full p-2 rounded-lg hover:bg-gray-700 transition mt-6"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>

    </aside>
  );
}
