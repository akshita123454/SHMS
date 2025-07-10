import Sanitation from '../models/sanitations.model.js';

export const getAllSanitations = async (req, res) => {
  const data = await Sanitation.find();
  res.json(data);
};

export const createSanitation = async (req, res) => {
  const newRecord = new Sanitation(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
