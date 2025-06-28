import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'Autoclave',
    description: 'High-pressure steam sterilizer for equipment',
    quantity: 4,
    batch: 'AUTO-221',
    expiry: '2029-12-31', // durable, but still included
  },
  {
    id: 2,
    name: 'Surface Disinfectant',
    description: 'Used for cleaning hospital surfaces',
    quantity: 120,
    batch: 'SD-9087',
    expiry: '2026-08-10',
  },
  {
    id: 3,
    name: 'Disposable Gloves',
    description: 'Latex gloves for cleaning & handling waste',
    quantity: 500,
    batch: 'GLV-444',
    expiry: '2027-05-01',
  },
  {
    id: 4,
    name: 'Mop Set',
    description: 'Cleaning mops with bucket for floor hygiene',
    quantity: 25,
    batch: 'MOP-331',
    expiry: 'N/A',
  },
];

export default function CleaningEquipment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Placeholder for future API call
    // axios.get('/api/cleaning-equipment').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Cleaning Equipment Inventory</h3>
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
