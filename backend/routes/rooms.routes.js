import express from 'express';
import {
  bookRoom,
  getAllRoomStatus,
  getAvailableRooms,
  checkRoomAvailability,
  seedRooms,
  createRoom
} from '../controller/rooms.controller.js';

const router = express.Router();

router.post('/book', bookRoom);
router.get('/status', getAllRoomStatus);
router.post('/available', getAvailableRooms);
router.post('/check', checkRoomAvailability);
router.post('/seed', seedRooms);
router.route('/createroom')
  .post(createRoom) // optional seed route
router

export default router;
