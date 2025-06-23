// routes/emergency.route.js
// routes/emergency.route.js

// ✅ Always import express first
import express from "express";

// ✅ Import your controller functions
import {
  createTriageCase,
  getAllTriageCases,
  createRoomAllotment,
  getAllRoomAllotments,
  getAllAmbulances,
  getAllNotifications
} from "../controller/emergency.controller.js";

//  Define router BEFORE using it
const router = express.Router();

// Routes
router.post('/triage', createTriageCase);
router.get('/triage', getAllTriageCases);

router.post('/room', createRoomAllotment);
router.get('/room', getAllRoomAllotments);

router.get('/ambulance', getAllAmbulances);
router.get('/notifications', getAllNotifications);

// Export router
export default router;
