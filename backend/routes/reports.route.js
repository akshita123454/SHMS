import express from "express";
import { getDashboardStats } from "../controller/reports.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/dashboard", protect, authorizeRoles('admin'), getDashboardStats);

export default router;
