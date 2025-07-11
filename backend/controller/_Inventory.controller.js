// controllers/_Inventory.controller.js
import _InventoryCategory from "../models/_InventoryCategory.model.js";

const computeStatus = (item) => {
  const now = new Date();
  if (item.expiryDate && new Date(item.expiryDate) < now) return "Expired";
  if (item.quantity < 5) return "Low Stock";
  return "In Stock";
};

export const addInventoryItem = async (req, res) => {
  try {
    const { name, description, quantity, batch, expiryDate, category } = req.body;

    const item = {
      name,
      description,
      quantity,
      batch,
      expiryDate,
      status: computeStatus({ quantity, expiryDate }),
    };

    let categoryDoc = await _InventoryCategory.findOne({ category });

    if (!categoryDoc) {
      categoryDoc = new _InventoryCategory({
        category,
        items: [item],
      });
    } else {
      categoryDoc.items.push(item);
    }

    await categoryDoc.save();
    res.status(201).json({ message: "Item added", category: categoryDoc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInventoryItems = async (req, res) => {
  try {
    const all = await _InventoryCategory.find();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const found = await _InventoryCategory.findOne({ category: categoryName });
    if (!found) return res.status(404).json({ message: "Category not found" });
    res.json(found.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
