//payroll.contorller.js
import { Payroll } from "../models/payroll.model.js";
import User from "../models/user.model.js";
import numberToWords from "number-to-words";
const { toWords } = numberToWords;

// helper to convert CTC into basic earnings demo (replace with real logic)
const buildEarnings = (ctc) => {
  const basic = +((ctc * 0.4) / 12).toFixed(2);
  const hra = +((ctc * 0.2) / 12).toFixed(2);
  const special = +((ctc * 0.3) / 12).toFixed(2);
  return [
    {
      type: "Basic",
      monthlyRate: basic,
      currentMonth: basic,
      arrears: 0,
      total: basic,
    },
    {
      type: "HRA",
      monthlyRate: hra,
      currentMonth: hra,
      arrears: 0,
      total: hra,
    },
    {
      type: "Special Allowance",
      monthlyRate: special,
      currentMonth: special,
      arrears: 0,
      total: special,
    },
  ];
};

export const createPayroll = async (req, res) => {
  try {
    const { staffId, month } = req.body;
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    // earnings and gross
    const earnings = buildEarnings(staff.ctc);
    const grossPay = +earnings.reduce((sum, e) => sum + e.total, 0).toFixed(2);

    // DEDUCTIONS (simplified demo values)
    // Replace with actual complex calculations involving tax slabs, exemptions, and investment declarations
    const pf = +((staff.ctc * 0.12) / 12).toFixed(2); // Employee's mandatory PF contribution
    const tax = +((staff.ctc * 0.05) / 12).toFixed(2); // Simplified example tax

    const deductions = [
      { type: "Employee PF", amount: pf }, // Existing PF, now explicitly labeled
      { type: "Voluntary PF", amount: 500.0 }, // Added Voluntary PF with a placeholder amount
      { type: "House Loan 1", amount: 2500.0 }, // Added House Loan 1 with a placeholder amount
      { type: "House Loan 2", amount: 1500.0 }, // Added House Loan 2 with a placeholder amount
      { type: "Income Tax", amount: tax },
    ];
    const totalDed = deductions.reduce((s, d) => s + d.amount, 0);
    const netPay = grossPay - totalDed;

    const payroll = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,

      designation: staff.designation || staff.role,
      location: staff.location || "Head Office",
      joiningDate: staff.joiningDate || staff.createdAt,
      bankAccount: staff.bankAccount || "N/A",
      pfAccount: staff.pfAccount || "N/A",
      standardDays: 30,
      lopDays: 0,
      refundDays: 0,

      earnings,
      deductions,
      grossPay,
      netPay,
      netPayInWords: `${toWords(Math.round(netPay)).toUpperCase()} ONLY`,

      exemptions: [{ label: "HRA", value: 50000 }],
      investments: [{ label: "Employee PF", value: pf * 12 }],
      slabWiseTax: [
        { label: "0‑2.5L", value: 0 },
        { label: "2.5L‑5L", value: 12500 },
      ],
      taxDeductedDetails: [{ label: "Income Tax", value: tax }],
    });

    const populated = await Payroll.findById(payroll._id).populate("staffId");
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate payroll" });
  }
};
export const getPayrolls = async (req, res) => {
  const docs = await Payroll.find().populate("staffId");
  res.json(docs);
};

export const deletePayroll = async (req, res) => {
  await Payroll.findByIdAndDelete(req.params.id);
  res.json({ message: "Payroll deleted" });
};
