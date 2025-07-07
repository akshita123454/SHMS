// backend/models/payroll.model.js
import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  type: { type: String, required: true },
  hours: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
});

const deductionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, default: 0 },
});

const payrollSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    earnings: [earningSchema],
    deductions: [deductionSchema],
    grossPay: {
      type: Number,
      required: true,
    },
    netPay: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processed"],
      default: "Processed",
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);
export default Payroll;
