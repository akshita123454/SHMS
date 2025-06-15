import React, { useState } from 'react';
import ReceptionLayout from './components/layout/ReceptionLayout';
import { BedDouble } from 'lucide-react';

export default function RoomAndBed() {
  const [roomType, setRoomType] = useState('');
  const [bedType, setBedType] = useState('');
  const [status, setStatus] = useState('');

  const checkAvailability = () => {
    if (roomType && bedType) {
      // Dummy logic — replace with actual if needed
      if (roomType === 'Private' && bedType === 'Single') {
        setStatus('Full');
      } else if (roomType === 'ICU') {
        setStatus('Limited');
      } else {
        setStatus('Available');
      }
    } else {
      setStatus('');
    }
  };

  return (
    <ReceptionLayout>
      
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <BedDouble className="w-6 h-6 text-black" />
          Room & Bed Availability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Room Type */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => {
                setRoomType(e.target.value);
                
              }}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Room Type</option>
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Bed Type */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Bed Type</label>
            <select
              value={bedType}
              onChange={(e) => {
                setBedType(e.target.value);
                checkAvailability();
              }}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Bed Type</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </select>
          </div>
        </div>

        {/* Combined Status Display */}
        {status && (
          <div className="mt-4 text-lg">
            Status:{' '}
            <span
              className={`font-semibold ${
                status === 'Available'
                  ? 'text-green-600'
                  : status === 'Limited'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {status}
            </span>
          </div>
        )}
      
    </ReceptionLayout>
  );
}
