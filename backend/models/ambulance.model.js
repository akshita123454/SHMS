// backend/models/ambulance.model.js
import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
  {
    vehicleNo: { type: String, required: true },
    driver: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "On Route", "Maintenance"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export const Ambulance = mongoose.model("Ambulance", ambulanceSchema);
