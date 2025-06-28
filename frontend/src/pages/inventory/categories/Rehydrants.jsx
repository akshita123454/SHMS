import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'ORS Sachet',
    description: 'Oral Rehydration Solution for dehydration',
    quantity: 500,
    batch: 'ORS-101',
    expiry: '2027-06-01',
  },
  {
    id: 2,
    name: 'Electrolyte Solution',
    description: 'Electrolyte balance solution for IV use',
    quantity: 200,
    batch: 'ELEC-442',
    expiry: '2026-11-30',
  },
  {
    id: 3,
    name: 'Glucose Saline',
    description: 'IV glucose with sodium chloride for quick rehydration',
    quantity: 150,
    batch: 'GLU-SLN-01',
    expiry: '2025-09-15',
  },
];

export default function Rehydrants() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get('/api/rehydrants').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Rehydrants Inventory</h3>
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
