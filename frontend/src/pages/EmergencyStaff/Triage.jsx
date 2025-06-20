import React from 'react';
import { registerTriageCase, getAllTriageCases } from '../../api/emergency/triage';


export default function Triage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Triage Registration</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patient Name */}
        <input
          className="p-2 border rounded"
          placeholder="Patient Name"
          required
        />

        {/* Age */}
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Age"
          required
        />

        {/* Gender */}
        <select className="p-2 border rounded" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        {/* Phone Number */}
        <input
          type="tel"
          className="p-2 border rounded"
          placeholder="Phone Number"
          required
        />

        {/* Address */}
        <input
          className="p-2 border rounded col-span-1 md:col-span-2"
          placeholder="Address"
          required
        />

        {/* Insurance Provider */}
        <input
          className="p-2 border rounded"
          placeholder="Insurance Provider"
        />

        {/* Severity */}
        <select className="p-2 border rounded" required>
          <option value="">Select Severity</option>
          <option value="critical">Critical</option>
          <option value="severe">Severe</option>
          <option value="mild">Mild</option>
        </select>

        {/* Notes */}
        <textarea
          className="p-2 border rounded col-span-1 md:col-span-2"
          placeholder="Notes"
          rows="3"
        />

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 text-right">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Register Case
          </button>
        </div>
      </form>
    </div>
  );
}
