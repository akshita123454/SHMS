// === FILE: backend/routes/staff.route.js ===
// backend/routes/staff.route.js
import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getRolesByDepartment,
  getDoctors,
} from "../controller/staff.controller.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.get("/roles/:department", getRolesByDepartment);
router.get("/doctors", getDoctors);

export default router;
