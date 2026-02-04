import Patient from '../models/patients.model.js';

// Register new patient
export const registerPatient = async (req, res) => {
  console.log("api is being hit for patient registration");
  console.log(req.body)
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(200).json({
      status: "success",
      patient
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Optional) GET all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
