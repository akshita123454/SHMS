import express from 'express';
import {
  bookRoom,
  getAllRoomStatus,
  getAvailableRooms,
  checkRoomAvailability,
  seedRooms,
} from '../controller/rooms.controller.js';

const router = express.Router();

router.post('/book', bookRoom);
router.get('/status', getAllRoomStatus);
router.post('/available', getAvailableRooms);
router.post('/check', checkRoomAvailability);
router.post('/seed', seedRooms); // optional seed route

export default router;
