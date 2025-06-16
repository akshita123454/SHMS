// ProfileForm: POST /api/patients
import express from 'express';
import Patient from '../models/patient.js';

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

export default router;