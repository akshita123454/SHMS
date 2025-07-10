import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../../api/reception/register';
import { Search } from 'lucide-react';

export default function RegisteredPatients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      console.error('❌ Failed to fetch patients:', err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filtered = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.id && p.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        Registered Patients
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Patient ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No matching patients found.
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.id || `P-${i + 1}`}</td>
                  <td className="border px-4 py-2">{`${p.firstName} ${p.lastName}`}</td>
                  <td className="border px-4 py-2">{p.age}</td>
                  <td className="border px-4 py-2">{p.gender}</td>
                  <td className="border px-4 py-2">{p.phone}</td>
                  <td className="border px-4 py-2">
                    {p.roomType && p.bedType ? `${p.roomType} / ${p.bedType}` : 'Not Allotted'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
