// routes/staff.route.js
import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controller/staff.controller.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
