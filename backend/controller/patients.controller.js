import Patient from '../models/patients.model.js';

export const getAllPatients = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

export const createPatient = async (req, res) => {
  const newRecord = new Patient(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
