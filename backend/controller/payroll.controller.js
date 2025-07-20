//payroll.contorller.js
import { Payroll } from "../models/payroll.model.js";
import User from "../models/user.model.js";
import numberToWords from "number-to-words";
const { toWords } = numberToWords;

// Helper to convert CTC into basic earnings demo (replace with real logic)
const buildEarnings = (
  ctc,
  isMetroCity,
  bonuses,
  otherAllowance // Added otherAllowance, removed hostelAllowance, childEducationAllowance
) => {
  // Ensure all numerical inputs are treated as numbers, defaulting to 0 if invalid
  const numericCtc = parseFloat(ctc) || 0;
  const numericBonuses = parseFloat(bonuses) || 0;
  const numericOtherAllowance = parseFloat(otherAllowance) || 0;

  const basic = +((numericCtc * 0.4) / 12).toFixed(2);
  let hra = 0;
  if (isMetroCity) {
    hra = +(basic * 0.5).toFixed(2); // 50% of basic for metro city
  } else {
    hra = +(basic * 0.4).toFixed(2); // 40% of basic for non-metro city
  }
  const special = +((numericCtc * 0.3) / 12).toFixed(2); // Remaining portion for special allowance

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
    {
      type: "Bonuses",
      monthlyRate: numericBonuses,
      currentMonth: numericBonuses,
      arrears: 0,
      total: numericBonuses,
    },
    {
      // Added Other Allowance
      type: "Other Allowance",
      monthlyRate: numericOtherAllowance,
      currentMonth: numericOtherAllowance,
      arrears: 0,
      total: numericOtherAllowance,
    },
  ];
};

export const createPayroll = async (req, res) => {
  try {
    const { staffId, month } = req.body;
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    // Ensure staff numerical properties are numbers, defaulting to 0
    const staffCtc = parseFloat(staff.ctc) || 0;
    const staffBonuses = parseFloat(staff.bonuses) || 0;
    const staffOtherAllowance = parseFloat(staff.otherAllowance) || 0;

    // earnings and gross
    const earnings = buildEarnings(
      staffCtc,
      staff.isMetroCity,
      staffBonuses,
      staffOtherAllowance
    );
    // Ensure sum is robust to potential NaN from toFixed if not careful
    const grossPay = earnings.reduce(
      (sum, e) => sum + (parseFloat(e.total) || 0),
      0
    );

    // deductions
    const pf = +(grossPay * 0.12).toFixed(2); // Example PF calculation (12% of gross)
    let esic = 0;
    if (grossPay < 15000) {
      esic = +(grossPay * 0.035).toFixed(2); // 3.5% ESIC if gross pay is below 15000
    }
    const incomeTax = +(grossPay * 0.05).toFixed(2); // Example income tax

    const deductions = [
      { type: "Provident Fund", amount: parseFloat(pf) || 0 },
      { type: "ESIC", amount: parseFloat(esic) || 0 },
      { type: "Income Tax", amount: parseFloat(incomeTax) || 0 },
    ];
    const totalDed = deductions.reduce(
      (s, d) => s + (parseFloat(d.amount) || 0),
      0
    );
    const netPay = grossPay - totalDed;

    // Log values before passing to toWords for debugging
    //console.log("Total Deductions:", totalDed);
    //console.log("Net Pay (before round):", netPay);
    //console.log("Gross Pay:", grossPay);
    //console.log("Net Pay (rounded):", Math.round(netPay));

    const payroll = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,

      designation: staff.designation || staff.role,
      location: staff.location || "Head Office",
      joiningDate: staff.joiningDate || staff.createdAt,
      bankAccount: staff.bankAccount || "N/A",
      pfAccount: staff.pfAccount || "N/A",
      esicNumber: staff.esicNumber || "N/A", // Include ESIC number
      standardDays: 30,
      lopDays: 0,
      refundDays: 0,

      earnings,
      deductions,
      grossPay,
      netPay,
      netPayInWords: `${toWords(Math.round(netPay)).toUpperCase()} ONLY`,

      exemptions: [
        {
          label: "HRA",
          value: earnings.find((e) => e.type === "HRA")?.total || 0,
        },
      ],
      investments: [
        { label: "Employee PF", value: (parseFloat(pf) || 0) * 12 },
      ],
      slabWiseTax: [
        { label: "0‑2.5L", value: 0 },
        { label: "2.5L‑5L", value: 12500 },
      ],
      taxDeductedDetails: [
        { label: "Income Tax", value: parseFloat(incomeTax) || 0 },
      ],
    });

    // Mark staff as payroll generated AFTER successful creation
    staff.payrollGenerated = true;
    await staff.save();

    const populated = await Payroll.findById(payroll._id).populate("staffId");
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("staffId");
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
