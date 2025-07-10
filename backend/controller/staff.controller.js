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

export const getAllStaff = async (req, res) => {
  try {
    const staffList = await User.find();
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const newStaff = new User(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

export const deleteStaff = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
