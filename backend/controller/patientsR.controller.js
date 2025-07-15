import { Patient } from "../models/patientsR.model.js";

// Register a new patient
export const registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to register patient" });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};
