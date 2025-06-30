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
} from "../controller/emergencyA.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

//  Define router BEFORE using it
const router = express.Router();

// Routes
router.post('/triage',protect, authorizeRoles('emergency'), createTriageCase);
router.get('/triage',protect, authorizeRoles('emergency'), getAllTriageCases);

router.post('/room',protect, authorizeRoles('emergency'), createRoomAllotment);
router.get('/room',protect, authorizeRoles('emergency'), getAllRoomAllotments);

router.get('/ambulance',protect, authorizeRoles('emergency'), getAllAmbulances);
router.get('/notifications',protect, authorizeRoles('emergency'), getAllNotifications);

// Export router
export default router;
