// routes/payroll.route.js
import express from "express";
import {
  getPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
} from "../controller/payroll.controller.js";

const router = express.Router();

router.get("/", getPayrolls);
router.post("/", createPayroll);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

export default router;
