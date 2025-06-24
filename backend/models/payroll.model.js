// models/payroll.model.js
import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    month: { type: String, required: true }, // e.g., "2025-06"
    salary: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processed", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
