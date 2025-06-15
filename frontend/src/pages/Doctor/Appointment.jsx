import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function Appointments() {
 const [appointments, setAppointments] = useState([
  { id: 1, patientName: 'Alice Harper', dateTime: '2025-06-10T14:00:00Z', phone: '123-123-1234', email: 'alice.harper@example.com', notes: 'General health check-up and vaccines renewal' },
  { id: 2, patientName: 'Bob Johnson', dateTime: '2025-06-11T09:30:00Z', phone: '555-555-5555', email: 'bob.johnson@example.com', notes: 'Follow-up for diabetes medication and lifestyle modifications' },
  { id: 3, patientName: 'Charlie Rogers', dateTime: '2025-06-11T11:15:00Z', phone: '984-984-9844', email: 'charlie.rogers@example.com', notes: 'Blood pressure follow-up, medication adjustment if necessary' },
  { id: 4, patientName: 'Diana Patel', dateTime: '2025-06-12T10:45:00Z', phone: '220-220-2200', email: 'diana.patel@example.com', notes: 'Consultation for persistent back pain and muscle stiffness' },
  { id: 5, patientName: 'Ethan Kim', dateTime: '2025-06-13T09:30:00Z', phone: '888-888-8888', email: 'ethan.kim@example.com', notes: 'Discussion about cholesterol medication and diet plan' },
  { id: 6, patientName: 'Fiona Lopez', dateTime: '2025-06-13T15:20:00Z', phone: '666-666-6666', email: 'fiona.lopez@example.com', notes: 'General health check-up and vaccines renewal' },
  { id: 7, patientName: 'George Peterson', dateTime: '2025-06-14T09:00:00Z', phone: '777-777-7777', email: 'george.peterson@example.com', notes: 'Consultation for persistent headaches and lifestyle factors' },
  { id: 8, patientName: 'Hannah Scott', dateTime: '2025-06-14T14:30:00Z', phone: '555-123-7890', email: 'hannah.scott@example.com', notes: 'Follow-up for asthma medication and symptoms control' }
]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  // Uncomment this when you connect API
  // useEffect(() => {
  //   setLoading(true);
  //   axios.get('/api/appointments')
  //     .then(res => setAppointments(res.data))
  //     .catch(() => setError('Failed to load appointments'))
  //     .finally(() => setLoading(false));  
  // }, []);

  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex gap-6">
      {/* Left side: List of appointments */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        <ul className="space-y-2">
          {appointments.map(a => (
            <li
              key={a.id}
              onClick={() => setSelected(a)}
              className={`p-2 border rounded-lg shadow-sm cursor-pointer transition ${
                selected?.id === a.id ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {a.patientName} @ {new Date(a.dateTime).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Detail view */}
      <div className="flex-1 p-4 border-l">
        {selected ? (
          <>
            <h3 className="text-lg font-semibold mb-2">{selected.patientName}</h3>
            <p>Date/Time: {new Date(selected.dateTime).toLocaleString()}</p>
            <p>Phone: {selected.phone}</p>
            <p>Email: {selected.email}</p>
            <p>Notes: {selected.notes}</p>
          </>
        ) : (
          <p className="text-gray-500">Select a patient to view details</p>
        )}

      </div>
    </div>
  );
}