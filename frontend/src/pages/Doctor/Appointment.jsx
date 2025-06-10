import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([
  { id: 1, patientName: 'Alice Smith', dateTime: '2025-06-10T14:00:00Z' },
  { id: 2, patientName: 'Bob Johnson', dateTime: '2025-06-11T09:30:00Z' }
]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     axios.get('/api/appointments')
//       .then(res => setAppointments(res.data))
//       .catch(() => setError('Failed to load appointments'))
//       .finally(() => setLoading(false));
//   }, []);



  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <ul className="space-y-2">
        {appointments.map(a => (
          <li key={a.id} className="p-2 border rounded-lg bg-white shadow-sm">
            {a.patientName} @ {new Date(a.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}