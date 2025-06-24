// controllers/payroll.controller.js
import Payroll from "../models/payroll.model.js";

// Get all payroll records
export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("staffId", "name role");
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a payroll record
export const createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    const saved = await payroll.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a payroll record
export const updatePayroll = async (req, res) => {
  try {
    const updated = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payroll record
export const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
