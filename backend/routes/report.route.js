// routes/report.route.js
import express from "express";
import { getReportStats } from "../controller/report.controller.js";

const router = express.Router();

router.get("/", getReportStats);

export default router;
