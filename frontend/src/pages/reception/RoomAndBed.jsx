import React, { useEffect, useState } from 'react';
import {
  getAvailableRooms,
  getAllRoomStatus,
  bookRoom,
  checkRoomAvailability,
} from '../../api/reception/room';
import { BedDouble } from 'lucide-react';

export default function RoomAndBed() {
  const [roomType, setRoomType] = useState('');
  const [bedType, setBedType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [status, setStatus] = useState('');
  const [bookedRooms, setBookedRooms] = useState([]);
  const [form, setForm] = useState({
    patientId: '',
    patientName: '',
  });

  // 🔄 Fetch rooms when room/bed type changes
  useEffect(() => {
  if (roomType && bedType) {
    const roomMap = {
      General: { Single: ['101', '102', '103'], Shared: ['104', '105'] },
      ICU: { Single: ['201', '202'], Shared: ['203'] },
      Private: { Single: ['301', '302'], Shared: ['303', '304'] },
    };

    const roomList = roomMap[roomType]?.[bedType] || [];
    setAvailableRooms(roomList.map(num => ({ roomNumber: num })));
    setRoomNumber('');
    setStatus('');
  } else {
    setAvailableRooms([]);
    setRoomNumber('');
    setStatus('');
  }
}, [roomType, bedType]);


  useEffect(() => {
    fetchBookedRooms();
  }, []);

  // 🔁 Re-fetch on new booking
  const fetchBookedRooms = async () => {
    const data = await getAllRoomStatus();
    setBookedRooms(data.filter((room) => room.status === 'Occupied'));
  };

  const fetchAvailableRooms = async () => {
    try {
      const data = await getAvailableRooms({ roomType, bedType });
      setAvailableRooms(data);
    } catch (err) {
      console.error('❌ Failed to fetch available rooms:', err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoomNumberChange = async (e) => {
    const value = e.target.value;
    setRoomNumber(value);
    if (value) {
      const availability = await checkRoomAvailability({
        roomType,
        bedType,
        roomNumber: value,
      });
      setStatus(availability);
    } else {
      setStatus('');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!roomType || !bedType || !roomNumber || !form.patientId || !form.patientName) return;

  try {
    await bookRoom({
      roomType,
      bedType,
      roomNumber,
      patientId: form.patientId,
      patientName: form.patientName,
    });

    // Update bookedRooms state immediately
    setBookedRooms(prev => [
      {
        roomNumber,
        patientName: form.patientName,
        patientId: form.patientId,
        status: 'Occupied'
      },
      ...prev
    ]);

    // Reset form and selections
    setForm({ patientId: '', patientName: '' });
    setRoomNumber('');
    setAvailableRooms([]);
    setStatus('');
  } catch (err) {
    console.error('❌ Booking failed:', err);
  }
};


  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow space-y-10">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <BedDouble className="w-6 h-6 text-black" />
        Room & Bed Management
      </h2>

      {/* 🔽 Room Selection Section */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Select Room & Bed</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Room Type</option>
            <option value="General">General</option>
            <option value="ICU">ICU</option>
            <option value="Private">Private</option>
          </select>

          <select
            value={bedType}
            onChange={(e) => setBedType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Bed Type</option>
            <option value="Single">Single</option>
            <option value="Shared">Shared</option>
          </select>

          <select
            value={roomNumber}
            onChange={handleRoomNumberChange}
            className="border p-2 rounded"
          >
            <option value="">Select Room Number</option>
            {availableRooms.map((room, idx) => (
              <option key={idx} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            ))}
          </select>
        </div>

        {/* 🔵 Room Availability */}
        {status && (
          <p className="mt-3 text-lg">
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
          </p>
        )}
      </section>

      {/* 📝 Booking Form */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Book Selected Room</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Patient ID"
            required
          />
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Patient Name"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Book Room
          </button>
        </form>
      </section>

      {/* 📋 Booked Rooms */}
      <section>
        <h3 className="text-lg font-bold text-red-600 mb-3">Rooms Booked</h3>
        {bookedRooms.length === 0 ? (
          <p className="text-gray-500">No rooms have been booked yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookedRooms.map((r, i) => (
              <div
                key={i}
                className="bg-red-100 text-red-900 border border-red-400 p-3 rounded shadow text-center"
              >
                <p><strong>Room:</strong> {r.roomNumber}</p>
                <p><strong>Patient:</strong> {r.patientName}</p>
                <p><strong>ID:</strong> {r.patientId}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
