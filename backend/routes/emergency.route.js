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
