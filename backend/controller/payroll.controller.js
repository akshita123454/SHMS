// backend/controller/payroll.controller.js
import Payroll from "../models/payroll.model.js";
import Staff from "../models/staff.model.js";

export const createPayroll = async (req, res) => {
  try {
    const { staffId, month } = req.body;

    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    const baseSalary = parseFloat(staff.baseSalary);

    // Sample working hours
    const standardHours = 40;
    const overtimeHours = 5;
    const holidayHours = 8;

    // Pay rates
    const standardRate = 12.5;
    const overtimeRate = 18.75;
    const holidayRate = 12.5;

    const earnings = [
      {
        type: "Standard Pay",
        hours: standardHours,
        rate: standardRate,
        amount: standardHours * standardRate,
      },
      {
        type: "Overtime Pay",
        hours: overtimeHours,
        rate: overtimeRate,
        amount: overtimeHours * overtimeRate,
      },
      {
        type: "Holiday Pay",
        hours: holidayHours,
        rate: holidayRate,
        amount: holidayHours * holidayRate,
      },
      {
        type: "Basic Pay",
        hours: 0,
        rate: 0,
        amount: baseSalary,
      },
    ];

    const grossPay = earnings.reduce((sum, e) => sum + e.amount, 0);

    const deductions = [
      { type: "PAYE Tax", amount: 250 },
      { type: "National Insurance", amount: 55 },
      { type: "Student Loan Repayment", amount: 30 },
      { type: "Pension", amount: 50 },
      { type: "Union Fees", amount: 5 },
    ];

    const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
    const netPay = grossPay - totalDeductions;

    const newPayroll = await Payroll.create({
      staffId: staff._id,
      employeeId: staff.employeeId,
      month,
      baseSalary,
      earnings,
      deductions,
      grossPay,
      netPay,
      status: "Processed",
    });

    // ✅ Populate staffId before returning
    const populatedPayroll = await Payroll.findById(newPayroll._id).populate(
      "staffId"
    );

    res.status(201).json(populatedPayroll);
  } catch (err) {
    console.error("❌ Error creating payroll:", err.message);
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
