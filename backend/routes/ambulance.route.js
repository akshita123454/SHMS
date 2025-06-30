// backend/routes/ambulance.route.js
import express from "express";
import {
  getAllAmbulances,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from "../controller/ambulance.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles('admin'), getAllAmbulances);
router.post("/",protect, authorizeRoles('admin'),  createAmbulance);
router.put("/:id",protect, authorizeRoles('admin'),  updateAmbulance);
router.delete("/:id",protect, authorizeRoles('admin'),  deleteAmbulance);

export default router;
