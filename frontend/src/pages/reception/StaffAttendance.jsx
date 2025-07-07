
// src/pages/reception/StaffAttendance.jsx
import React, { useEffect, useState } from 'react';
import {
  markAttendance,
  getTodaysAttendance,
} from '../../api/reception/attendance.js';
import { UserCheck2, ClipboardCheck } from 'lucide-react';

export default function StaffAttendance() {
  const [staffList] = useState([
    { id: 'D101', name: 'Dr. Aryan Mehta', role: 'Doctor' },
    { id: 'D102', name: 'Dr. Sneha Nair', role: 'Doctor' },
    { id: 'N201', name: 'Nurse Kavita', role: 'Nurse' },
    { id: 'N202', name: 'Nurse Pradeep', role: 'Nurse' },
    { id: 'R301', name: 'Receptionist Anjali', role: 'Receptionist' },
  ]);

  const [presentToday, setPresentToday] = useState([]);
  const [marking, setMarking] = useState(false);

  const fetchAttendance = async () => {
    try {
      const data = await getTodaysAttendance();
      setPresentToday(data);
    } catch (err) {
      console.error('❌ Failed to fetch attendance:', err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleMark = async (staff) => {
    setMarking(true);
    try {
      await markAttendance(staff);
      await fetchAttendance(); // refresh list
    } catch (err) {
      console.error('❌ Error marking attendance:', err);
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow space-y-10">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <ClipboardCheck className="w-6 h-6" />
        Staff Attendance
      </h2>

      {/* 🟢 Mark Attendance */}
      <section>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Mark Attendance</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {staffList.map((staff) => {
            const alreadyPresent = presentToday.find((s) => s.id === staff.id);
            return (
              <div
                key={staff.id}
                className={`border rounded p-3 flex justify-between items-center ${
                  alreadyPresent ? 'bg-green-100' : ''
                }`}
              >
                <div>
                  <p className="font-medium">{staff.name}</p>
                  <p className="text-sm text-gray-600">{staff.role}</p>
                </div>
                <button
                  onClick={() => handleMark(staff)}
                  disabled={alreadyPresent || marking}
                  className={`px-4 py-1 text-sm rounded ${
                    alreadyPresent
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {alreadyPresent ? 'Present' : 'Mark'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ✅ Available Today */}
      <section>
        <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
          <UserCheck2 className="w-5 h-5" />
          Staff Available Today
        </h3>
        {presentToday.length === 0 ? (
          <p className="text-gray-500">No attendance marked yet today.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            {presentToday.map((staff) => (
              <li key={staff.id}>
                {staff.name} ({staff.role})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}