import React, { useEffect, useState } from 'react';
import { getAllNotifications } from '../../api/emergency/notifications';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotifications().then(setNotifications);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        {notifications.map((note, idx) => (
          <li key={idx}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
}
