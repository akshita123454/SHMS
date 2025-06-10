import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function Patients() {
  const [patients, setPatients] = useState([
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Brian Thompson' },
  { id: 3, name: 'Catherine Lee' },
  { id: 4, name: 'Daniel Kim' },
  { id: 5, name: 'Eva Martínez' }
]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     axios.get('/api/patients')
//       .then(res => setPatients(res.data))
//       .catch(err => setError('Failed to load patients'))
//       .finally(() => setLoading(false));
//   }, []);

  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Patient List</h2>
      <ul className="list-disc ml-6 space-y-2">
        {patients.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}