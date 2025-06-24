import express from "express";
import {
  getAmbulances,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from "../controller/ambulance.controller.js";

const router = express.Router();

router.get("/", getAmbulances);
router.post("/", createAmbulance);
router.put("/:id", updateAmbulance);
router.delete("/:id", deleteAmbulance);

export default router;
