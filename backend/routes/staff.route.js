import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getRolesByDepartment,
} from "../controller/staff.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles('admin'),getAllStaff);
router.post("/",protect, authorizeRoles('admin'), createStaff);
router.put("/:id",protect, authorizeRoles('admin'),  updateStaff);
router.delete("/:id",protect, authorizeRoles('admin'),  deleteStaff);

// New route
router.get("/roles/:department", getRolesByDepartment);

export default router;
