import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'X-Ray Machine',
    description: 'Digital imaging machine for radiography',
    quantity: 2,
    batch: 'XRAY-9832',
    expiry: '2030-12-31',
  },
  {
    id: 2,
    name: 'Ventilator',
    description: 'Mechanical ventilator for ICU patients',
    quantity: 5,
    batch: 'VENT-445',
    expiry: '2031-03-20',
  },
  {
    id: 3,
    name: 'Dialysis Unit',
    description: 'Used for hemodialysis in kidney patients',
    quantity: 3,
    batch: 'DIAL-112',
    expiry: '2029-10-10',
  },
];

export default function Machinery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get('/api/machinery').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Machinery Inventory</h3>
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
