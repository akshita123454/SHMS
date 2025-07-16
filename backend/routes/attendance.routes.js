import express from 'express';
import { markAttendance, getTodaysAttendance } from '../controller/attendance.controller.js';

const router = express.Router();

// POST /api/attendance
router.post('/', markAttendance);

// GET /api/attendance
router.get('/', getTodaysAttendance);

export default router;
