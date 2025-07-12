import React, { useEffect, useState } from 'react';
import { getAllAmbulances } from '../../api/emergency/ambulance';

export default function AmbulanceTracker() {
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    const fetchAmbulances = async () => {
      const data = await getAllAmbulances();
      setAmbulances(data);
    };

    fetchAmbulances();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ambulance Tracker</h2>
      <div className="h-64 bg-gray-200 flex items-center justify-center mb-4">Map Placeholder</div>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Driver Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">ETA</th>
            <th className="p-2 border">Driver Contact</th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((amb, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{amb.name}</td>
              <td className="p-2 border">{amb.status}</td>
              <td className="p-2 border">{amb.eta}</td>
              <td className="p-2 border">{amb.driverContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

