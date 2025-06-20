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
//Add a Notification to a Specific Patient
router.post('/notifications/:patientId', async (req, res) => {
  try {
    const { content, status } = req.body;
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.notifications.push({ content, status });
    await patient.save();
    res.status(201).json({ message: "Notification added", notifications: patient.notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get All Notifications
router.get('/all-notifications', async (req, res) => {
  try {
    const patients = await Patient.find({ "notifications.0": { $exists: true } });
    const allNotifications = patients.flatMap(p =>
      p.notifications.map(n => ({
        content: n.content || "",
        status: n.status || "New",
        date: n.date || "",
        patientName: p.name || "Unknown",
      }))
    );
    res.json(allNotifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// /POST /api/patients/reports/:patientId – Add a report to a patient
router.post('/reports/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.reports.push(req.body); // { name, link }
    await patient.save();

    res.status(201).json({ message: "Report added", reports: patient.reports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET /api/patients/all-reports – Get all reports for all patients
router.get('/all-reports', async (req, res) => {
  try {
    const patients = await Patient.find({ "reports.0": { $exists: true } });
    const allReports = patients.flatMap(p =>
      p.reports.map(r => ({
        name: r.name || "Unknown Report",
        link: r.link || "#",
        patientName: p.name || "Unknown"
      }))
    );
    res.json(allReports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


