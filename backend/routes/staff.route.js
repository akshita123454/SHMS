import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getRolesByDepartment,
} from "../controller/staff.controller.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

// New route
router.get("/roles/:department", getRolesByDepartment);

export default router;
