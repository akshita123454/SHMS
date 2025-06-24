import Ambulance from "../models/ambulance.model.js";

// Get all ambulances
export const getAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new ambulance
export const createAmbulance = async (req, res) => {
  try {
    //console.log("🛠 Incoming ambulance data:", req.body);
    const ambulance = new Ambulance(req.body);
    const saved = await ambulance.save();
    res.status(201).json(saved);
  } catch (error) {
    //console.log("🔥 Mongoose error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Update ambulance
export const updateAmbulance = async (req, res) => {
  try {
    const updated = await Ambulance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ambulance
export const deleteAmbulance = async (req, res) => {
  try {
    await Ambulance.findByIdAndDelete(req.params.id);
    res.json({ message: "Ambulance deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
