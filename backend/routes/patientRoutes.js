// ProfileForm: POST /api/patients
import express from 'express';
import Patient from '../models/patient.model.js';

const router = express.Router();

// Anyone can create a new patient (Profile form)
router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
});

// Anyone can book an appointment (Appointment form)
router.post('/appointments', async (req, res) => {
  const patient = new Patient({ appointments: [req.body] });
  await patient.save();
  res.status(201).json(patient);
});

// Anyone can send a message (Message form)
router.post('/messages', async (req, res) => {
  const patient = new Patient({ messages: [req.body] });
  await patient.save();
  res.status(201).json(patient);
});

// Get all appointments (for Appointment History page)
// patientRoutes.js
router.get('/all-appointments', async (req, res) => {
  const patients = await Patient.find({ "appointments.0": { $exists: true } });
  const allAppointments = patients.flatMap(p =>
    p.appointments.map(a => ({
      doctor: a.doctor || "",
      date: a.date || "",
      status: a.status || "",
      _id: p._id
    }))
  );
  res.json(allAppointments);
});

// Get all medical histories (for Medical History page)
router.get('/all-medical-history', async (req, res) => {
  const patients = await Patient.find({ "medicalHistory.0": { $exists: true } });
  const allHistory = patients.flatMap(p =>
    p.medicalHistory.map(h => ({
      date: h.date || "",
      name: p.name || "",
      description: h.description || "",
      _id: p._id
    }))
  );
  res.json(allHistory);
});

export default router;