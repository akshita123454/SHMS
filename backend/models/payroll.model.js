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

const exemptionSchema = new mongoose.Schema({
  type: { type: String },
  amount: { type: Number, default: 0 },
});

const investmentSchema = new mongoose.Schema({
  type: { type: String },
  amount: { type: Number, default: 0 },
});

const rentDetailSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  amount: Number,
});

const slabSchema = new mongoose.Schema({
  from: Number,
  to: Number,
  rate: Number,
  taxAmount: Number,
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
    exemptions: [exemptionSchema],
    investments: [investmentSchema],
    rentDetails: [rentDetailSchema],
    taxSlabs: [slabSchema],

    grossPay: Number,
    netPay: Number,
    netPayInWords: String,

    grossIncome: Number,
    taxableIncome: Number,
    taxPayable: Number,
    taxDeductedThisMonth: Number,

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
