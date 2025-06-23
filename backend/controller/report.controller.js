// controllers/report.controller.js
import Payroll from "../models/payroll.model.js";
import Emergency from "../models/emergency.model.js";
import Staff from "../models/staff.model.js";

export const getReportStats = async (req, res) => {
  try {
    const totalStaff = await Staff.countDocuments();
    const criticalCases = await Emergency.countDocuments({
      status: "Critical",
    });

    const payrollData = await Payroll.find();
    const totalSalary = payrollData.reduce((sum, p) => sum + p.salary, 0);
    const processed = payrollData.filter(
      (p) => p.status === "Processed"
    ).length;
    const pending = payrollData.length - processed;

    res.json({
      totalStaff,
      criticalCases,
      payroll: {
        totalSalary,
        processed: `${Math.round((processed / payrollData.length) * 100)}%`,
        pending: `${Math.round((pending / payrollData.length) * 100)}%`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
