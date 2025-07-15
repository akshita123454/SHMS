// === FILE: backend/routes/staff.route.js ===
// backend/routes/staff.route.js
import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getDepartmentByRoles,
  getStaffById, // Ensure getStaffById is imported here
} from "../controller/staff.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// THIS IS ADMIN STAFF PAGE:

router.get("/", protect, authorizeRoles("admin"), getAllStaff);
router.post("/", protect, authorizeRoles("admin"), createStaff);
router.put("/:id", protect, authorizeRoles("admin"), updateStaff);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStaff);
router.get(
  "/roles/:role",
  protect,
  authorizeRoles("admin"),
  getDepartmentByRoles
);
// Route to get staff by ID
router.get("/:id", protect, authorizeRoles("admin"), getStaffById);

export default router;
