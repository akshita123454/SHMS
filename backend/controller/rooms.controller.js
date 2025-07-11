import Room from '../models/rooms.model.js';


// Book a room
export const bookRoom = async (req, res) => {
  const { roomNumber, roomType, bedType, patientId, patientName } = req.body;

  if (!roomNumber || !roomType || !bedType || !patientId || !patientName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.status === 'Occupied') {
      return res.status(400).json({ message: 'Room is already occupied' });
    }

    room.status = 'Occupied';
    room.patientId = patientId;
    room.patientName = patientName;

    await room.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all room statuses (for displaying booked rooms)
export const getAllRoomStatus = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get available rooms based on type
export const getAvailableRooms = async (req, res) => {
  const { roomType, bedType } = req.body;

  try {
    const rooms = await Room.find({
      roomType,
      bedType,
      status: 'Available',
    });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check availability of specific room
export const checkRoomAvailability = async (req, res) => {
  const { roomType, bedType, roomNumber } = req.body;

  try {
    const room = await Room.findOne({ roomNumber, roomType, bedType });

    if (!room) return res.status(404).json({ status: 'Not Found' });

    res.json({ status: room.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Optional) Seed initial rooms (admin/dev use)
export const seedRooms = async (req, res) => {
  try {
    const rooms = [
      { roomNumber: '101', roomType: 'General', bedType: 'Single' },
      { roomNumber: '102', roomType: 'General', bedType: 'Single' },
      { roomNumber: '103', roomType: 'General', bedType: 'Single' },
      { roomNumber: '104', roomType: 'General', bedType: 'Shared' },
      { roomNumber: '105', roomType: 'General', bedType: 'Shared' },
      { roomNumber: '201', roomType: 'ICU', bedType: 'Single' },
      { roomNumber: '202', roomType: 'ICU', bedType: 'Single' },
      { roomNumber: '203', roomType: 'ICU', bedType: 'Shared' },
      { roomNumber: '301', roomType: 'Private', bedType: 'Single' },
      { roomNumber: '302', roomType: 'Private', bedType: 'Single' },
      { roomNumber: '303', roomType: 'Private', bedType: 'Shared' },
      { roomNumber: '304', roomType: 'Private', bedType: 'Shared' },
    ];

    await Room.insertMany(rooms);
    res.status(201).json({ message: 'Rooms seeded successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
