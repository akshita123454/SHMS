import Room from "../models/room.model.js";

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Add new room
export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to add room" });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: "Failed to update room" });
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete room" });
  }
};

// Get room stats
export const getRoomStats = async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const available = await Room.countDocuments({ status: "Available" });
    const occupied = await Room.countDocuments({ status: "Occupied" });
    res.json({ total, available, occupied });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch room stats" });
  }
};
