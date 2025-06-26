import express from "express";
import { getDashboardStats } from "../controller/reports.controller.js";
const router = express.Router();

router.get("/dashboard", getDashboardStats);

export default router;
