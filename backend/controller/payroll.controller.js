// backend/controller/payroll.controller.js
import Payroll from "../models/payroll.model.js";
import User from "../models/user.model.js";
import numberToWords from "number-to-words";
const { toWords } = numberToWords;

export const createPayroll = async (req, res) => {
  try {
    const { staffId, month } = req.body;
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    const ctc = parseFloat(staff.ctc);
    if (!ctc || ctc <= 0) return res.status(400).json({ error: "Invalid CTC" });

    const basic = +(ctc * 0.4).toFixed(2);
    const hra = +(ctc * 0.2).toFixed(2);
    const specialAllowance = +(ctc * 0.2).toFixed(2);
    const otherAllowances = +(ctc * 0.2).toFixed(2);

    const earnings = [
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
        monthlyRate: specialAllowance,
        currentMonth: specialAllowance,
        arrears: 0,
        total: specialAllowance,
      },
      {
        type: "Other Allowances",
        monthlyRate: otherAllowances,
        currentMonth: otherAllowances,
        arrears: 0,
        total: otherAllowances,
      },
    ];

    const grossPay = earnings.reduce((sum, e) => sum + e.total, 0);
    const pf = +(basic * 0.12).toFixed(2);
    const incomeTax = +(ctc * 0.1).toFixed(2);
    const deductions = [
      { type: "PF", amount: pf },
      { type: "Income Tax", amount: incomeTax },
    ];
    const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
    const netPay = +(grossPay - totalDeductions).toFixed(2);

    const newPayroll = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,
      ctc,
      earnings,
      deductions,
      grossPay,
      netPay,
      netPayInWords: `${toWords(Math.floor(netPay)).toUpperCase()} ONLY`,
      designation: staff.role,
      pfAccount: staff.pfAccount || "NA",
      joiningDate: staff.createdAt,
      location: staff.location || "Head Office",
      lopDays: 0,
      refundDays: 0,
      status: "Processed",
    });

    const populated = await Payroll.findById(newPayroll._id).populate(
      "staffId"
    );
    res.status(201).json(populated);
  } catch (err) {
    console.error("Error creating payroll:", err);
    res.status(500).json({ error: "Failed to generate payroll" });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("staffId");
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payrolls" });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    await Payroll.findByIdAndDelete(id);
    res.json({ message: "Payroll deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete payroll" });
  }
};
