import express from 'express';
import {
  getSanitationStatus,
  markRoomSanitized,
  seedSanitationRooms,
} from '../controller/sanitations.controller.js';

const router = express.Router();

router.get('/status', getSanitationStatus);
router.post('/mark', markRoomSanitized);
router.post('/seed', seedSanitationRooms); // optional

export default router;
