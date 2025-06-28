import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'ECG Monitor',
    description: 'Electronic heart monitoring device',
    quantity: 6,
    batch: 'ECG-9981',
    expiry: '2031-01-01',
  },
  {
    id: 2,
    name: 'Pulse Oximeter',
    description: 'Measures oxygen saturation levels',
    quantity: 50,
    batch: 'OXI-777',
    expiry: '2028-03-30',
  },
  {
    id: 3,
    name: 'Infusion Pump',
    description: 'Used to deliver fluids into a patient’s body',
    quantity: 12,
    batch: 'INF-555',
    expiry: '2030-08-15',
  },
];

export default function ElectronicDevices() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get('/api/electronic-devices').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Electronic Devices Inventory</h3>
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
