// === FILE: backend/routes/staff.route.js ===
// backend/routes/staff.route.js
import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
// <<<<<<< superman
  getRolesByDepartment,
  getDoctors,
// =======
  getDepartmentByRoles,
// >>>>>>> main
} from "../controller/staff.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// <<<<<<< superman
router.get("/", getAllStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.get("/roles/:department", getRolesByDepartment);
router.get("/doctors", getDoctors);
// =======
// router.get("/", protect, authorizeRoles("admin"), getAllStaff);
// router.post("/", protect, authorizeRoles("admin"), createStaff);
// router.put("/:id", protect, authorizeRoles("admin"), updateStaff);
// router.delete("/:id", protect, authorizeRoles("admin"), deleteStaff);

// // ✅ Protected role lookup route
// router.get(
//   "/roles/:role",
//   protect,
//   authorizeRoles("admin"),
//   getDepartmentByRoles
// );
// >>>>>>> main

export default router;
