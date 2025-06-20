import React from 'react';

export default function AmbulanceTracker() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ambulance Tracker</h2>
      <div className="h-64 bg-gray-200 flex items-center justify-center mb-4">Map Placeholder</div>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ambulance</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">ETA</th>
            <th className="p-2 border">Driver Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Ambulance 1</td>
            <td className="p-2 border">On Route</td>
            <td className="p-2 border">8 mins</td>
            <td className="p-2 border">+91-9876543210</td>
          </tr>
          <tr>
            <td className="p-2 border">Ambulance 2</td>
            <td className="p-2 border">Arrived</td>
            <td className="p-2 border">0 mins</td>
            <td className="p-2 border">+91-9876543222</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
