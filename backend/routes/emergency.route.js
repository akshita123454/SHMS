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
=======
import express from "express";
import {
  getEmergencies,
  createEmergency,
  updateEmergency,
  deleteEmergency,
} from "../controller/emergency.controller.js";

const router = express.Router();

router.get("/", getEmergencies);
router.post("/", createEmergency);
router.put("/:id", updateEmergency);
router.delete("/:id", deleteEmergency);

export default router;
