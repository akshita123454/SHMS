// models/inventory.model.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // New
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    threshold: { type: Number, default: 10 }, // New
    vendor: { type: String }, // New
    purchaseDate: { type: Date }, // New
    expiryDate: { type: Date },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Expired"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
