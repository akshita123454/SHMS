import Doctor from '../models/doctors.model.js';

export const getAllDoctors = async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
};

export const createDoctor = async (req, res) => {
  const newRecord = new Doctor(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
