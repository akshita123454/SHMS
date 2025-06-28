import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'Ambulance Stretcher',
    description: 'Wheeled stretcher used in ambulances',
    quantity: 10,
    batch: 'AMB-STR-001',
    expiry: '2030-01-01',
  },
  {
    id: 2,
    name: 'Folding Stretcher',
    description: 'Portable foldable stretcher for transport',
    quantity: 20,
    batch: 'FOLD-STR-004',
    expiry: '2029-06-15',
  },
  {
    id: 3,
    name: 'Patient Carrier Sheet',
    description: 'Manual fabric sheet for lifting patients',
    quantity: 50,
    batch: 'PCS-778',
    expiry: '2027-09-30',
  },
];

export default function Stretchers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get('/api/stretchers').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Stretchers & Carriers Inventory</h3>
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
