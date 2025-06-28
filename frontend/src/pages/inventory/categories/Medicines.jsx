// components/inventory/categories/Medicines.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'Paracetamol',
    description: 'Pain reliever and fever reducer',
    quantity: 150,
    batch: 'A12X',
    expiry: '2026-04-30',
  },
  {
    id: 2,
    name: 'Amoxicillin',
    description: 'Antibiotic for bacterial infections',
    quantity: 75,
    batch: 'B45T',
    expiry: '2025-12-15',
  },
  {
    id: 3,
    name: 'ORS Sachet',
    description: 'Rehydration salt for diarrhea patients',
    quantity: 300,
    batch: 'ORS99',
    expiry: '2027-01-10',
  },
];

export default function Medicines() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Placeholder for future API call
    // axios.get('/api/medicines').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Medicines Inventory</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Batch No.</th>
              <th className="px-4 py-2 text-left">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.batch}</td>
                <td className="px-4 py-2">{item.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}