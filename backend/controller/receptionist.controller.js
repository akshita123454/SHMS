const Receptionist = require("../models/receptionist.model");

// Create
exports.addReceptionist = async (req, res) => {
  try {
    const newReceptionist = new Receptionist(req.body);
    await newReceptionist.save();
    res.status(201).json(newReceptionist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All
exports.getReceptionists = async (req, res) => {
  try {
    const list = await Receptionist.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getReceptionistById = async (req, res) => {
  try {
    const receptionist = await Receptionist.findById(req.params.id);
    if (!receptionist) return res.status(404).json({ message: "Not found" });
    res.json(receptionist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateReceptionist = async (req, res) => {
  try {
    const updated = await Receptionist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteReceptionist = async (req, res) => {
  try {
    await Receptionist.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

