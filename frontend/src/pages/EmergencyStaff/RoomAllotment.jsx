import React, { useEffect, useState } from 'react';
import { allotRoom, getAllRoomAllotments } from '../../api/emergency/roomallotment';

export default function RoomAllotment() {
  const [form, setForm] = useState({ patientId: '', roomNumber: '' });
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await allotRoom(form);
    setForm({ patientId: '', roomNumber: '' });
    fetchRooms();
  };

  const fetchRooms = async () => {
    const data = await getAllRoomAllotments();
    setRooms(data);
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Room Allotment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <input name="patientId" value={form.patientId} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Patient ID" required />
        <input name="roomNumber" value={form.roomNumber} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Room Number" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Allot Room</button>
      </form>
      <h3 className="font-semibold">Live Bed Status</h3>
      <ul className="list-disc ml-6 space-y-1 mt-2">
        {rooms.map((room, idx) => (
          <li key={idx}>Room {room.roomNumber} - {room.status}</li>
        ))}
      </ul>
    </div>
  );
}
