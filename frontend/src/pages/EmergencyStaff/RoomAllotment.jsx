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
    <div className="bg-white rounded shadow-md p-6 max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Room Allotment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Allot Room</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Patient ID"
              required
            />
            <input
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Room Number"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Allot Room
            </button>
          </form>
        </div>

        {/* Right Section - Status */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Live Bed Status</h3>
          <ul className="list-disc pl-5 space-y-2 max-h-64 overflow-y-auto border rounded p-4 bg-gray-50">
            {rooms.length > 0 ? (
              rooms.map((room, idx) => (
                <li key={idx}>
                  <span className="font-medium">Room {room.roomNumber}</span> - {room.status}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No room data available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
