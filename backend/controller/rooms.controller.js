import Room from '../models/rooms.model.js';

export const getAllRooms = async (req, res) => {
  const data = await Room.find();
  res.json(data);
};

export const createRoom = async (req, res) => {
  const newRecord = new Room(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
