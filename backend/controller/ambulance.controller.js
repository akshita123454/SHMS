// backend/controllers/ambulance.controller.js
import { Ambulance } from "../models/ambulance.model.js";

export const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ambulances" });
  }
};

export const createAmbulance = async (req, res) => {
  try {
    const { vehicleNo, driver, status } = req.body;
    const newAmbulance = new Ambulance({ vehicleNo, driver, status });
    await newAmbulance.save();
    res.status(201).json(newAmbulance);
  } catch (err) {
    res.status(400).json({ message: "Failed to create ambulance" });
  }
};

export const updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleNo, driver, status } = req.body;

    const updated = await Ambulance.findByIdAndUpdate(
      id,
      { vehicleNo, driver, status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update ambulance" });
  }
};

export const deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ambulance.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Ambulance not found" });
    }
    res.json({ message: "Ambulance deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete ambulance" });
  }
};
