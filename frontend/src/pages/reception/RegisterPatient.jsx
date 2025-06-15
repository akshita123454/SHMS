// src/pages/reception/RegisterPatient.jsx
import React from 'react';
import ReceptionLayout from './components/layout/ReceptionLayout';

import { UserPlus } from 'lucide-react';

export default function RegisterPatient() {
  return (
    <ReceptionLayout>
      
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <UserPlus className="w-6 h-6" />
          Register New Patient
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Contact Number"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded col-span-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Insurance Provider"
            className="border p-2 rounded"
          />
        </form>

        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Register
        </button>
      
    </ReceptionLayout>
  );
}