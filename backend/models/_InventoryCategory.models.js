// models/_InventoryCategory.model.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: Number,
  batch: String,
  expiryDate: Date,
  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Expired"],
    default: "In Stock",
  },
}, { timestamps: true });

const inventoryCategorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  items: [itemSchema],
}, { timestamps: true });

const _InventoryCategory = mongoose.model("_InventoryCategory", inventoryCategorySchema);

export default _InventoryCategory;
