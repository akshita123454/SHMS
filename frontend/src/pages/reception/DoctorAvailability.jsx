// src/pages/reception/DoctorAvailability.jsx
import React, { useState } from 'react';
import { UserCheck, Clock8 } from 'lucide-react';

export default function DoctorAvailability() {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const doctorData = {
    Cardiology: ['Dr. Aryan Mehta', 'Dr. Rina Kapoor'],
    Orthopedics: ['Dr. Manoj Reddy', 'Dr. Kavita Shah'],
    Neurology: ['Dr. Prateek Roy', 'Dr. Sneha Nair'],
  };

  const doctorSchedule = {
    'Dr. Aryan Mehta': {
      Monday: '10:00 AM - 1:00 PM',
      Wednesday: '2:00 PM - 5:00 PM',
      Friday: '10:00 AM - 1:00 PM',
    },
    'Dr. Rina Kapoor': {
      Tuesday: '9:00 AM - 12:00 PM',
      Thursday: '1:00 PM - 4:00 PM',
    },
    'Dr. Manoj Reddy': {
      Monday: '11:00 AM - 2:00 PM',
      Wednesday: '10:00 AM - 1:00 PM',
      Friday: '3:00 PM - 6:00 PM',
    },
    'Dr. Kavita Shah': {
      Tuesday: '2:00 PM - 5:00 PM',
      Thursday: '10:00 AM - 1:00 PM',
    },
    'Dr. Prateek Roy': {
      Monday: '9:00 AM - 12:00 PM',
      Thursday: '2:00 PM - 5:00 PM',
    },
    'Dr. Sneha Nair': {
      Wednesday: '11:00 AM - 2:00 PM',
      Friday: '10:00 AM - 1:00 PM',
    },
  };

  const handleDepartmentChange = (e) => {
    setSelectedDept(e.target.value);
    setSelectedDoctor('');
  };

  return (
    
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <UserCheck className="w-6 h-6 text-black" />
          Doctor Availability
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <select
            value={selectedDept}
            onChange={handleDepartmentChange}
            className="border p-2 rounded w-64"
          >
            <option value="">Select Department</option>
            {Object.keys(doctorData).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {selectedDept && (
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border p-2 rounded w-64"
            >
              <option value="">Select Doctor</option>
              {doctorData[selectedDept].map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedDoctor && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Clock8 className="w-5 h-5" />
              Schedule for {selectedDoctor}
            </h3>
            {doctorSchedule[selectedDoctor] ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {Object.entries(doctorSchedule[selectedDoctor]).map(
                  ([day, time]) => (
                    <li key={day}>
                      <strong>{day}:</strong> {time}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-red-500">No schedule available.</p>
            )}
          </div>
        )}
      </div>
    
  );
}
