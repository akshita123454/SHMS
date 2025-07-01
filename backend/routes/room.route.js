import express from "express";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomStats,
} from "../controller/room.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect, authorizeRoles('admin'),  getRooms);
router.post("/",protect, authorizeRoles('admin'),  createRoom);
router.put("/:id",protect, authorizeRoles('admin'),  updateRoom);
router.delete("/:id", protect, authorizeRoles('admin'), deleteRoom);
router.get("/stats",protect, authorizeRoles('admin'),  getRoomStats);

export default router;
