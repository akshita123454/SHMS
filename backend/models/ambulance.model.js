import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
  {
    vehicleNo: {
      type: String,
      required: true,
      unique: true,
    },
    driver: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "On Route", "Maintenance"],
      default: "Available",
    },
    location: {
      type: String,
      required: true,
    },
    eta: {
      type: String,
      default: "-",
    },
  },
  { timestamps: true }
);

const Ambulance = mongoose.model("Ambulance", ambulanceSchema);

export default Ambulance;
