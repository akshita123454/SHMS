// models/inventory.model.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock"],
      default: "In Stock",
    },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
