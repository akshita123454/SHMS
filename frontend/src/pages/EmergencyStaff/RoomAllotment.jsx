import React from 'react';
import { allotRoom, getAllRoomAllotments } from '../../api/emergency/roomallotment';

export default function RoomAllotment() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Room Allotment</h2>
      <form className="space-y-4 mb-4">
        <input className="w-full p-2 border rounded" placeholder="Patient ID" />
        <input className="w-full p-2 border rounded" placeholder="Room Number" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Allot Room</button>
      </form>
      <h3 className="font-semibold">Live Bed Status</h3>
      <ul className="list-disc ml-6 space-y-1 mt-2">
        <li>Room 101 - Occupied</li>
        <li>Room 102 - Available</li>
        <li>Room 103 - Cleaning in Progress</li>
      </ul>
    </div>
  );
}
