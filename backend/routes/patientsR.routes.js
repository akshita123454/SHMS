import express from "express";
import { getAllPatients, registerPatient } from "../controller/patientsR.controller.js";

const router = express.Router();

router.post("/", registerPatient);
router.get("/", getAllPatients);

export default router;
