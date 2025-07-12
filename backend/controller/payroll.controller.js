import Payroll from "../models/payroll.model.js";
import User from "../models/user.model.js";
import numberToWords from "number-to-words";
const { toWords } = numberToWords;

// 🔧 Helper: build default earnings breakdown from CTC
const buildEarnings = (ctc) => {
  const basic = +(ctc * 0.4).toFixed(2);
  const hra = +(ctc * 0.2).toFixed(2);
  const specialAllowance = +(ctc * 0.25).toFixed(2);
  const otherAllowance = +(ctc * 0.15).toFixed(2);

  return [
    {
      type: "BASIC",
      monthlyRate: basic,
      currentMonth: basic,
      arrears: 0,
      total: basic,
    },
    {
      type: "HOUSE RENT ALLOWANCE",
      monthlyRate: hra,
      currentMonth: hra,
      arrears: 0,
      total: hra,
    },
    {
      type: "SPECIAL ALLOWANCE",
      monthlyRate: specialAllowance,
      currentMonth: specialAllowance,
      arrears: 0,
      total: specialAllowance,
    },
    {
      type: "OTHER ALLOWANCE",
      monthlyRate: otherAllowance,
      currentMonth: otherAllowance,
      arrears: 0,
      total: otherAllowance,
    },
  ];
};

// 🔧 Helper: simple slab‑wise tax calculator (old‑regime like example)
const calculateSlabTax = (annualTaxable) => {
  const slabs = [
    { from: 0, to: 250000, rate: 0 },
    { from: 250000, to: 500000, rate: 5 },
    { from: 500000, to: 1000000, rate: 20 },
    { from: 1000000, to: Infinity, rate: 30 },
  ];
  let remaining = annualTaxable;
  const result = [];
  let totalTax = 0;
  for (const slab of slabs) {
    if (remaining <= 0) break;
    const taxableInSlab = Math.max(0, Math.min(remaining, slab.to - slab.from));
    const taxAmt = +(taxableInSlab * (slab.rate / 100)).toFixed(2);
    result.push({ ...slab, taxAmount: taxAmt });
    totalTax += taxAmt;
    remaining -= taxableInSlab;
  }
  return { slabDetails: result, totalTax };
};

export const createPayroll = async (req, res) => {
  try {
    const { staffId, month } = req.body;
    const staff = await User.findById(staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    const ctc = Number(staff.ctc);
    if (!ctc || ctc <= 0) return res.status(400).json({ error: "Invalid CTC" });

    // Earnings & Gross
    const earnings = buildEarnings(ctc);
    const grossPay = earnings.reduce((s, e) => s + e.total, 0);

    // Provident Fund & Income‑Tax (simple demo)
    const pf = +(earnings[0].total * 0.12).toFixed(2);
    const { slabDetails, totalTax } = calculateSlabTax(ctc); // annual basis
    const monthlyTax = +(totalTax / 12).toFixed(2);

    // Deductions array
    const deductions = [
      { type: "EMPLOYEE P F", amount: pf },
      { type: "INCOME TAX", amount: monthlyTax },
    ];
    const grossDeduction = deductions.reduce((s, d) => s + d.amount, 0);

    // Net
    const netPay = +(grossPay - grossDeduction).toFixed(2);

    // Assemble payroll doc
    const payrollDoc = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,
      ctc,
      earnings,
      deductions,
      exemptions: [],
      investments: [],
      rentDetails: [],
      taxSlabs: slabDetails,
      grossPay,
      netPay,
      netPayInWords: `${toWords(Math.floor(netPay)).toUpperCase()} ONLY`,
      grossIncome: ctc,
      taxableIncome: ctc, // simplistic
      taxPayable: totalTax,
      taxDeductedThisMonth: monthlyTax,
      pfAccount: staff.pfAccount || "NA",
      designation: staff.role,
      joiningDate: staff.createdAt,
      location: staff.location || "Head Office",
      lopDays: 0,
      refundDays: 0,
      status: "Processed",
    });

    const populated = await Payroll.findById(payrollDoc._id).populate(
      "staffId"
    );
    res.status(201).json(populated);
  } catch (err) {
    console.error("Payroll create error:", err);
    res.status(500).json({ error: "Failed to generate payroll" });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const docs = await Payroll.find().populate("staffId");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payrolls" });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete payroll" });
  }
};
