// controllers/emergency.controller.js
import Emergency from "../models/emergency.model.js";

// Get all emergency cases
export const getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new emergency case
export const createEmergency = async (req, res) => {
  try {
    const emergency = new Emergency(req.body);
    const saved = await emergency.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update emergency case
export const updateEmergency = async (req, res) => {
  try {
    const updated = await Emergency.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete emergency case
export const deleteEmergency = async (req, res) => {
  try {
    await Emergency.findByIdAndDelete(req.params.id);
    res.json({ message: "Emergency deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });

  }
};
