// models/staff.model.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: true,
      default: () => `EMP${Date.now()}`,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
