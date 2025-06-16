const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Get patient data (for dashboard)
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/:id/profile', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book Appointment
router.post('/:id/appointments', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.appointments.push(req.body);
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
