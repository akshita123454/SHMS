// models/item.model.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    batch: { type: String, required: true },
    expiry: { type: Date, required: true },
    category: {
      type: String,
      enum: [
        "Medicines",
        "Surgical Equipment",
        "Rehydrants",
        "Machinery",
        "Cleaning Equipment",
        "Stretchers & Carriers",
        "Other Carrying Equipment",
        "Electronic Devices",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
