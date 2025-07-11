import express from 'express';
import {
  getAllDepartmentsWithDoctors,
  getDoctorSchedule,
  addDoctor,
} from '../controller/doctors.controller.js';

const router = express.Router();

router.get('/departments', getAllDepartmentsWithDoctors);
router.get('/schedule/:name', getDoctorSchedule);
router.post('/', addDoctor); // Optional: add doctor manually

export default router;
