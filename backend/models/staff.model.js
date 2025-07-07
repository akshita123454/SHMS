import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    baseSalary: {
      type: Number,
      required: true,
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
