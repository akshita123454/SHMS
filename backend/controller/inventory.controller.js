// controllers/inventory.controller.js
import Inventory from "../models/inventory.model.js";

// Auto status check
const computeStatus = (item) => {
  const now = new Date();
  if (item.expiryDate && new Date(item.expiryDate) < now) return "Expired";
  if (item.quantity < item.threshold) return "Low Stock";
  return "In Stock";
};

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const itemData = req.body;
    itemData.status = computeStatus(itemData);
    const newItem = new Inventory(itemData);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const updatedData = req.body;
    updatedData.status = computeStatus(updatedData);
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
