import React from "react";
import {
  Users,
  CalendarCheck,
  HeartPulse,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <Users size={28} />,
    label: "Patients",
    count: 120,
    bg: "from-blue-100 to-blue-50 text-blue-700",
  },
  {
    icon: <CalendarCheck size={28} />,
    label: "Appointments",
    count: 42,
    bg: "from-green-100 to-green-50 text-green-700",
  },
  {
    icon: <HeartPulse size={28} />,
    label: "Surgeries",
    count: 15,
    bg: "from-rose-100 to-rose-50 text-rose-700",
  },
  {
    icon: <Star size={28} />,
    label: "Reviews",
    count: 58,
    bg: "from-yellow-100 to-yellow-50 text-yellow-700",
  },
];

const appointments = [
  {
    name: "Emilia Fox",
    diagnosis: "Eczema",
    datetime: "June 29, 2023, 08:00",
    notes: "First appointment",
  },
];

const notifications = [
  "You have 38 appointment requests.",
  "Your vacation request was denied.",
  "Tom Daley cancelled his appointment.",
  "Someone wants to become your patient.",
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className={`bg-gradient-to-br ${stat.bg} rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition-all duration-200`}
          >
            <div className="bg-white p-3 rounded-full shadow text-xl">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold mt-3">{stat.count}</h3>
            <p className="text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Section */}
        <div className="col-span-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="border-b px-6 py-4 bg-blue-100">
            <h2 className="text-xl font-semibold text-blue-700">
              Upcoming Appointments
            </h2>
          </div>
          <div className="p-6 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-blue-600 font-semibold">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Diagnosis</th>
                  <th className="pb-2">Date & Time</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-100/40 transition rounded"
                  >
                    <td className="py-2">{appt.name}</td>
                    <td className="py-2">{appt.diagnosis}</td>
                    <td className="py-2">{appt.datetime}</td>
                    <td className="py-2">{appt.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md border border-gray-200">
          <div className="border-b px-6 py-4 bg-blue-100">
            <h2 className="text-xl font-semibold text-blue-700">
              Notifications
            </h2>
          </div>
          <div className="p-6 space-y-4 text-gray-800 text-sm">
            {notifications.map((note, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 shadow-sm border-l-4 border-blue-400 px-3 py-2 rounded-md"
              >
                {note}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
