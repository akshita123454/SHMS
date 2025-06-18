import React from "react";
import { Users, CalendarCheck, HeartPulse, Star } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <Users size={28} />, label: "Patients", count: 120 },
  { icon: <CalendarCheck size={28} />, label: "Appointments", count: 42 },
  { icon: <HeartPulse size={28} />, label: "Surgeries", count: 15 },
  { icon: <Star size={28} />, label: "Reviews", count: 58 },
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
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-primary">{stat.icon}</div>
            <h3 className="text-3xl font-bold mt-2">{stat.count}</h3>
            <p className="text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments */}
        <div className="col-span-2 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-blue-600">Upcoming Appointments</h2>
          </div>
          <div className="p-6 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-blue-500 font-semibold">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Diagnosis</th>
                  <th className="pb-2">Date & Time</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition">
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
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-blue-600">Notifications</h2>
          </div>
          <div className="p-6 space-y-3 text-gray-700 text-sm">
            {notifications.map((note, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                • {note}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
