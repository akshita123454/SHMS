// models/emergency.model.js
import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    patientName: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["Mild", "Severe", "Critical", "Resolved"],
      default: "Critical",
    },
  },
  { timestamps: true }
);

const Emergency = mongoose.model("Emergency", emergencySchema);

export default Emergency;
