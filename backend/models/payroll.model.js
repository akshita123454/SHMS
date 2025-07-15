//payroll.model.js
import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  type: String,
  monthlyRate: Number,
  currentMonth: Number,
  arrears: Number,
  total: Number,
});

const deductionSchema = new mongoose.Schema({ type: String, amount: Number });
const labelValue = new mongoose.Schema({ label: String, value: Number });

const payrollSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: String,
    month: String,

    // static header info
    designation: String,
    location: String,
    joiningDate: Date,
    bankAccount: String,
    pfAccount: String,
    esicNumber: String, // New field
    standardDays: Number,
    lopDays: Number,
    refundDays: Number,

    // money
    earnings: [earningSchema],
    deductions: [deductionSchema],
    grossPay: Number,
    netPay: Number,
    netPayInWords: String,

    // tax & other sections
    exemptions: [labelValue],
    investments: [labelValue],
    slabWiseTax: [labelValue],
    taxDeductedDetails: [labelValue],
  },
  { timestamps: true }
);

export const Payroll = mongoose.model("Payroll", payrollSchema);
