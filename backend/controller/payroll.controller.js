import { Payroll } from "../models/payroll.model.js";
import User from "../models/user.model.js";
import numberToWords from "number-to-words";
const { toWords } = numberToWords;

// Helper to convert CTC into basic earnings demo (replace with real logic)
const buildEarnings = (
  ctc,
  isMetroCity,
  bonuses,
  otherAllowance,
  userBasic, // User-entered basic
  userSpecialAllowance // User-entered special allowance
) => {
  // Ensure all numerical inputs are treated as numbers, defaulting to 0 if invalid
  const numericCtc = parseFloat(ctc) || 0;
  const numericBonuses = parseFloat(bonuses) || 0;
  const numericOtherAllowance = parseFloat(otherAllowance) || 0;
  const numericUserBasic = parseFloat(userBasic) || 0; // User-entered basic
  const numericUserSpecialAllowance = parseFloat(userSpecialAllowance) || 0; // User-entered special allowance

  // Log inputs for debugging
  console.log("buildEarnings inputs:", {
    ctc: numericCtc,
    isMetroCity,
    bonuses: numericBonuses,
    otherAllowance: numericOtherAllowance,
    userBasic: numericUserBasic,
    userSpecialAllowance: numericUserSpecialAllowance,
  });

  const calculatedBasic = +((numericCtc * 0.4) / 12).toFixed(2);
  let hra = 0;
  if (isMetroCity) {
    hra = +(calculatedBasic * 0.5).toFixed(2); // 50% of calculated basic for metro city
  } else {
    hra = +(calculatedBasic * 0.4).toFixed(2); // 40% of calculated basic for non-metro city
  }
  const calculatedSpecial = +((numericCtc * 0.3) / 12).toFixed(2);

  // Add user-entered values to calculated values
  const finalBasic = calculatedBasic + numericUserBasic;
  const finalSpecial = calculatedSpecial + numericUserSpecialAllowance;

  // Log calculated values for debugging
  console.log("buildEarnings calculated:", {
    calculatedBasic,
    finalBasic,
    hra,
    calculatedSpecial,
    finalSpecial,
  });

  return [
    {
      type: "Basic",
      monthlyRate: finalBasic,
      currentMonth: finalBasic,
      arrears: 0,
      total: finalBasic,
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
      monthlyRate: finalSpecial,
      currentMonth: finalSpecial,
      arrears: 0,
      total: finalSpecial,
    },
    {
      type: "Bonuses",
      monthlyRate: numericBonuses,
      currentMonth: numericBonuses,
      arrears: 0,
      total: numericBonuses,
    },
    {
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
    const staffBasic = parseFloat(staff.basic) || 0; // User-entered basic
    const staffSpecialAllowance = parseFloat(staff.specialAllowance) || 0; // User-entered special allowance

    // Log staff data for debugging
    console.log("createPayroll staff data:", {
      staffId,
      month,
      ctc: staffCtc,
      bonuses: staffBonuses,
      otherAllowance: staffOtherAllowance,
      basic: staffBasic,
      specialAllowance: staffSpecialAllowance,
    });

    // earnings and gross
    const earnings = buildEarnings(
      staffCtc,
      staff.isMetroCity,
      staffBonuses,
      staffOtherAllowance,
      staffBasic, // Pass user-entered basic
      staffSpecialAllowance // Pass user-entered special allowance
    );

    // Log earnings for debugging
    console.log("createPayroll earnings:", earnings);

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

    const payroll = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,
      designation: staff.designation || staff.role,
      location: staff.location || "Head Office",
      joiningDate: staff.joiningDate || staff.createdAt,
      bankAccount: staff.bankAccount || "N/A",
      pfAccount: staff.pfAccount || "N/A",
      esicNumber: staff.esicNumber || "N/A",
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
    console.error("createPayroll error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("staffId");
    res.json(payrolls);
  } catch (error) {
    console.error("getPayrolls error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error("deletePayroll error:", error);
    res.status(500).json({ message: error.message });
  }
};
