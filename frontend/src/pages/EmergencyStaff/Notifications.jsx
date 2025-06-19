import React from 'react';

export default function Notifications() {
  const notifications = [
    'Dr. Smith notified - Taking Case 1',
    'Nurse Alisha on Call - Standby Mode',
    'Alert: Ambulance 1 is delayed due to traffic',
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
