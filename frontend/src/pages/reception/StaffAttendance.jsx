// src/pages/reception/StaffAttendance.jsx
import React, { useEffect, useState } from 'react';
import { markAttendance, getTodaysAttendance } from '../../api/reception/attendance.js';
import { UserCheck2, ClipboardCheck, UserX2 } from 'lucide-react';

// Mapping domain to job titles
const departmentRoles = {
  Doctor: ['Cardiologist', 'Neurologist', 'Surgeon', 'General Physician'],
  Nurse: ['ICU Nurse', 'Ward Nurse', 'Surgical Nurse', 'Maternity Nurse'],
  Admin: ['HR', 'Finance', 'IT', 'Operations Manager'],
  Reception: ['Receptionist', 'Front Desk Officer'],
  Lab: ['Pathologist', 'Lab Technician'],
  Pharmacy: ['Pharmacist', 'Inventory Manager'],
};

export default function StaffAttendance() {
  const [staffList] = useState([
    { id: 'D101', name: 'Dr. Aryan Mehta', role: 'Cardiologist', department: 'Doctor' },
    { id: 'D102', name: 'Dr. Sneha Nair', role: 'Neurologist', department: 'Doctor' },
    { id: 'N201', name: 'Kavita', role: 'ICU Nurse', department: 'Nurse' },
    { id: 'N202', name: 'Pradeep', role: 'Ward Nurse', department: 'Nurse' },
    { id: 'R301', name: 'Anjali', role: 'Receptionist', department: 'Reception' },
    { id: 'P401', name: 'Vikas', role: 'Pharmacist', department: 'Pharmacy' },
    { id: 'A501', name: 'Riya', role: 'HR', department: 'Admin' },
  ]);

  const [presentToday, setPresentToday] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [marking, setMarking] = useState(false);

  const fetchAttendance = async () => {
    try {
      const data = await getTodaysAttendance(); // [{ id, name, role, department, status }]
      setPresentToday(data);
    } catch (err) {
      console.error('❌ Failed to fetch attendance:', err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleMark = async (staff, status) => {
    setMarking(true);
    try {
      await markAttendance({ ...staff, status }); // Pass department too
      await fetchAttendance();
    } catch (err) {
      console.error('❌ Error marking attendance:', err);
    } finally {
      setMarking(false);
    }
  };

  const alreadyMarked = (id) => presentToday.find((s) => s.id === id);
  const filteredStaff = selectedDepartment
    ? staffList.filter((s) => s.department === selectedDepartment)
    : staffList;

  const presentStaff = presentToday.filter((s) => s.status === 'Present');
  const leaveStaff = presentToday.filter((s) => s.status === 'On Leave');
  const presentFiltered = selectedDepartment
    ? presentStaff.filter((s) => s.department === selectedDepartment)
    : presentStaff;
  const leaveFiltered = selectedDepartment
    ? leaveStaff.filter((s) => s.department === selectedDepartment)
    : leaveStaff;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow space-y-10">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <ClipboardCheck className="w-6 h-6" />
        Staff Attendance
      </h2>

      {/* 🔽 Filter by Department */}
      <div className="mb-4">
        <label className="font-medium mr-2">Filter by Department:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          {Object.keys(departmentRoles).map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* 🟢 Mark Attendance */}
      <section>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Mark Attendance</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {filteredStaff.map((staff) => {
            const record = alreadyMarked(staff.id);
            return (
              <div
                key={staff.id}
                className={`border rounded p-3 flex justify-between items-center ${
                  record?.status === 'Present'
                    ? 'bg-green-100'
                    : record?.status === 'On Leave'
                    ? 'bg-yellow-100'
                    : ''
                }`}
              >
                <div>
                  <p className="font-medium">{staff.name}</p>
                  <p className="text-sm text-gray-600">{staff.role} ({staff.department})</p>
                </div>
                {record ? (
                  <span
                    className={`text-sm font-semibold ${
                      record.status === 'Present'
                        ? 'text-green-600'
                        : 'text-yellow-700'
                    }`}
                  >
                    {record.status}
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMark(staff, 'Present')}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      disabled={marking}
                    >
                      Mark Present
                    </button>
                    <button
                      onClick={() => handleMark(staff, 'On Leave')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      disabled={marking}
                    >
                      On Leave
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ✅ Present */}
      <section>
        <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
          <UserCheck2 className="w-5 h-5" />
          Present Today {selectedDepartment && `- ${selectedDepartment}`}
        </h3>
        {presentFiltered.length === 0 ? (
          <p className="text-gray-500">No one is marked present.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            {presentFiltered.map((s) => (
              <li key={s.id}>{s.name} ({s.role})</li>
            ))}
          </ul>
        )}
      </section>

      {/* 🟡 On Leave */}
      <section>
        <h3 className="text-lg font-bold text-yellow-700 mb-3 flex items-center gap-2">
          <UserX2 className="w-5 h-5" />
          On Leave Today {selectedDepartment && `- ${selectedDepartment}`}
        </h3>
        {leaveFiltered.length === 0 ? (
          <p className="text-gray-500">No one is marked on leave.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            {leaveFiltered.map((s) => (
              <li key={s.id}>{s.name} ({s.role})</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
