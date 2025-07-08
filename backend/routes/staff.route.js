import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getDepartmentByRoles,
} from "../controller/staff.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getAllStaff);
router.post("/", protect, authorizeRoles("admin"), createStaff);
router.put("/:id", protect, authorizeRoles("admin"), updateStaff);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStaff);

// ✅ Protected role lookup route
router.get(
  "/roles/:role",
  protect,
  authorizeRoles("admin"),
  getDepartmentByRoles
);

export default router;
