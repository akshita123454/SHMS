// backend/routes/ambulance.route.js
import express from "express";
import {
  getAllAmbulances,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from "../controller/ambulance.controller.js";

const router = express.Router();

router.get("/", getAllAmbulances);
router.post("/", createAmbulance);
router.put("/:id", updateAmbulance);
router.delete("/:id", deleteAmbulance);

export default router;
