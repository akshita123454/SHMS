import React, { useState, useMemo } from 'react';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data
  const patients = [
    { id: 'P001', name: 'Alice Johnson', phone: '(555) 123‑4567', allergies: ['Peanuts', 'Penicillin'] },
    { id: 'P002', name: 'Brian Thompson', phone: '(555) 765‑4321', allergies: ['Latex'] },
    { id: 'P003', name: 'Catherine Lee', phone: '(555) 888‑9999', allergies: ['None'] },
    { id: 'P004', name: 'Daniel Kim', phone: '(555) 000‑1111', allergies: ['Peanuts'] },
    { id: 'P005', name: 'Eva Martínez', phone: '(555) 222‑3333', allergies: ['Aspirin'] }
    
  ];

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter(
      p =>
        p.id.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term)
    );
  }, [searchTerm, patients]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Patient List</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-semibold">Patient ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-500 font-semibold">Phone</th>
                <th className="px-4 py-3 text-left text-gray-500 font-semibold">Allergies</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((p) => (
                   <tr
                      key={p.id}
                      onClick={() => (window.location.href = "#")} // Later you can use react-router
                      className="transition transform ease-in-out duration-200 hover:shadow-md hover:bg-gray-50 cursor-pointer border-2 border-transparent hover:border-blue-500"
                   >
                    <td className="px-4 py-3 text-gray-900">{p.id}</td>
                    <td className="px-4 py-3 text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-900">{p.phone}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {p.allergies.length ? p.allergies.join(', ') : 'None'}
                    </td>
                   </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                     No patients found.
                   </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Loader } from 'lucide-react';

// export default function Patients() {
//   const [patients, setPatients] = useState([
//   { id: 1, name: 'Alice Johnson' },
//   { id: 2, name: 'Brian Thompson' },
//   { id: 3, name: 'Catherine Lee' },
//   { id: 4, name: 'Daniel Kim' },
//   { id: 5, name: 'Eva Martínez' }
// ]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

// //   useEffect(() => {
// //     setLoading(true);
// //     axios.get('/api/patients')
// //       .then(res => setPatients(res.data))
// //       .catch(err => setError('Failed to load patients'))
// //       .finally(() => setLoading(false));
// //   }, []);

//   if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold mb-4">Patient List</h2>
//       <ul className="list-disc ml-6 space-y-2">
//         {patients.map(p => <li key={p.id}>{p.name}</li>)}
//       </ul>
//     </div>
//   );
// }