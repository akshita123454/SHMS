import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
} from "../controller/doctor.controller.js";
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// TODO: protect the other routes as well for that.
router.post('/prescriptions', protect, authorizeRoles('doctor'), createPrescription);
router.get('/prescriptions', protect, authorizeRoles('doctor'), getAllPrescriptions);

export default router;


