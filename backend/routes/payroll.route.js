import express from "express";
import {
  createPayroll,
  getPayrolls,
  deletePayroll,
} from "../controller/payroll.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", protect, authorizeRoles("admin"), getPayrolls);
router.post("/", protect, authorizeRoles("admin"), createPayroll);
router.delete("/:id", protect, authorizeRoles("admin"), deletePayroll);
export default router;