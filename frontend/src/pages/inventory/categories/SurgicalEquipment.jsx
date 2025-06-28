import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dummyData = [
  {
    id: 1,
    name: 'Scalpel',
    description: 'Precision surgical knife for incisions',
    quantity: 50,
    batch: 'SCLP-001',
    expiry: '2028-10-01',
  },
  {
    id: 2,
    name: 'Forceps',
    description: 'Used to grasp or hold tissue and objects',
    quantity: 80,
    batch: 'FRCP-145',
    expiry: '2029-03-15',
  },
  {
    id: 3,
    name: 'Surgical Scissors',
    description: 'Sharp scissors for cutting tissues or sutures',
    quantity: 60,
    batch: 'SCSS-088',
    expiry: '2027-12-31',
  },
  {
    id: 4,
    name: 'Retractors',
    description: 'Used to hold open a surgical incision or wound',
    quantity: 30,
    batch: 'RTRC-212',
    expiry: '2030-01-01',
  },
];

export default function SurgicalEquipment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Placeholder for future API call
    // axios.get('/api/surgical-equipment').then(res => setData(res.data)).catch(console.error);
    setData(dummyData);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Surgical Equipment Inventory</h3>
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
