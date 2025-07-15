import Sanitation from '../models/sanitations.model.js';

// Get status of all rooms (sanitized & pending)
export const getSanitationStatus = async (req, res) => {
  try {
    const all = await Sanitation.find();
    const sanitized = all.filter(r => r.isSanitized).map(r => r.roomNumber);
    const pending = all.filter(r => !r.isSanitized).map(r => r.roomNumber);

    res.json({ sanitized, pending });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark a room as sanitized
export const markRoomSanitized = async (req, res) => {
  const { roomNumber } = req.body;

  if (!roomNumber) {
    return res.status(400).json({ message: 'Room number is required' });
  }

  try {
    const updated = await Sanitation.findOneAndUpdate(
      { roomNumber },
      { isSanitized: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: `Room ${roomNumber} marked as sanitized`, updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Optional) Seed rooms for sanitation
export const seedSanitationRooms = async (req, res) => {
  try {
    const rooms = ['101', '102', '103', '104', '105', '201', '202', '203'].map((room) => ({
      roomNumber: room,
      isSanitized: false,
    }));

    await Sanitation.insertMany(rooms);
    res.status(201).json({ message: 'Sanitation rooms seeded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
