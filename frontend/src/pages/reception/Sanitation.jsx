import React, { useState } from 'react';
import { Brush, CheckCircle } from 'lucide-react';
import { getSanitationStatus, markRoomSanitized } from '../../api/reception/sanitation';

export default function Sanitation() {
  // Predefined lists
  const [sanitizedRooms, setSanitizedRooms] = useState([201, 202]); // Already sanitized rooms
  const [pendingRooms, setPendingRooms] = useState([101, 102, 103, 104, 105]);

  const handleSanitize = (room) => {
    setPendingRooms(prev => prev.filter(r => r !== room));
    setSanitizedRooms(prev => [...prev, room]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2 mb-6">
        <Brush className="w-6 h-6" /> Sanitation Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Sanitation */}
        <div className="bg-red-50 p-4 rounded border">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Rooms Not Yet Sanitized</h3>
          <p className="text-sm text-red-600 mb-3">Total: {pendingRooms.length}</p>
          {pendingRooms.length > 0 ? (
            <ul className="space-y-2">
              {pendingRooms.map(room => (
                <li key={room} className="flex justify-between items-center bg-white border rounded px-3 py-2">
                  Room {room}
                  <button
                    onClick={() => handleSanitize(room)}
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark Sanitized
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">All rooms are sanitized!</p>
          )}
        </div>

        {/* Sanitized Rooms */}
        <div className="bg-green-50 p-4 rounded border">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Rooms Sanitized</h3>
          <p className="text-sm text-green-600 mb-3">Total: {sanitizedRooms.length}</p>
          {sanitizedRooms.length > 0 ? (
            <ul className="space-y-2">
              {sanitizedRooms.map(room => (
                <li key={room} className="flex items-center gap-2 bg-white border rounded px-3 py-2">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                  Room {room}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No rooms sanitized yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
