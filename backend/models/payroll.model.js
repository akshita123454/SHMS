// backend/models/payroll.model.js
import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  type: { type: String, required: true },
  monthlyRate: { type: Number, default: 0 },
  currentMonth: { type: Number, default: 0 },
  arrears: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const deductionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, default: 0 },
});

const payrollSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: { type: String, required: true },
    month: { type: String, required: true },
    ctc: { type: Number, required: true },
    earnings: [earningSchema],
    deductions: [deductionSchema],
    grossPay: { type: Number, required: true },
    netPay: { type: Number, required: true },
    netPayInWords: String,
    pfAccount: String,
    designation: String,
    joiningDate: Date,
    location: String,
    lopDays: { type: Number, default: 0 },
    refundDays: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Processed"],
      default: "Processed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payroll", payrollSchema);
