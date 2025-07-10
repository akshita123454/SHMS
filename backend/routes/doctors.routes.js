import express from 'express';
import { getAllDoctors, createDoctor } from '../controllers/doctors.controller.js';
const router = express.Router();

router.get('/', getAllDoctors);
router.post('/', createDoctor);

export default router;
