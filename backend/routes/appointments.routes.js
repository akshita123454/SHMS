import express from 'express';
import {
  getAllAppointments,
  bookAppointment,
  cancelAppointment,
} from '../controller/appointments.controller.js';

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', bookAppointment);
router.delete('/:id', cancelAppointment);

export default router;
