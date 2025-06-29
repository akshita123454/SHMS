// routes/payroll.route.js
import express from "express";
import {
  getPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
} from "../controller/payroll.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect, authorizeRoles('admin'),  getPayrolls);
router.post("/",protect, authorizeRoles('admin'),  createPayroll);
router.put("/:id",protect, authorizeRoles('admin'),  updatePayroll);
router.delete("/:id",protect, authorizeRoles('admin'),  deletePayroll);

export default router;
