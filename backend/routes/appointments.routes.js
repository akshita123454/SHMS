import express from 'express';
import { getAllAppointments, createAppointment, cancelAppointment, } from '../controller/appointments.controller.js';
const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.delete('/:id', cancelAppointment);

export default router;
