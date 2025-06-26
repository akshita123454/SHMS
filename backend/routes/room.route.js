import express from "express";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomStats,
} from "../controller/room.controller.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/stats", getRoomStats);

export default router;
