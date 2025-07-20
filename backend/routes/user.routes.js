import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// GET all doctors
router.get("/doctors/only", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name department role");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error });
  }
});

export default router;
