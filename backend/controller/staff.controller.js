import User from "../models/user.model.js";

const department = {
  doctor: ["Cardiologist", "Neurologist", "Surgeon", "General Physician"],
  nurse: ["ICU Nurse", "Ward Nurse", "Surgical Nurse", "Maternity Nurse"],
  admin: ["HR", "Finance", "IT", "Operations Manager"],
  reception: ["Receptionist", "Front Desk Officer"],
  lab: ["Pathologist", "Lab Technician"],
  pharmacy: ["Pharmacist", "Inventory Manager"],
  emergency: ["Emergency"],
  patient: ["Patient"],
};

export const getDepartmentByRoles = async (req, res) => {
  const { role } = req.params;
  const roles = department[role] || [];
  res.json(roles);
};

// >>>>>>> main
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await User.find();
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create staff with role check
export const createStaff = async (req, res) => {
  const { name, department, role, email, status } = req.body;

  if (!role || role.trim() === "") {
    return res.status(400).json({ message: "Role is required." });
  }

  try {
// <<<<<<< superman
    // const newStaff = new Staff({ name, department, role, email, status });
// =======
    const newStaff = new User(req.body);
// >>>>>>> main
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update existing staff
export const updateStaff = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (!updateData.password) delete updateData.password;
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete staff
export const deleteStaff = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all active doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Staff.find({
      status: "Active",
      role: { $regex: /Doctor/i },
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
