import Staff from "../models/staff.model.js";

// ✅ Updated department-role mapping with top-level categories
const departmentRoles = {
  Doctor: ["Cardiologist", "Neurologist", "Surgeon", "General Physician"],
  Nurse: ["ICU Nurse", "Ward Nurse", "Surgical Nurse", "Maternity Nurse"],
  Admin: ["HR", "Finance", "IT", "Operations Manager"],
  Reception: ["Receptionist", "Front Desk Officer"],
  Lab: ["Pathologist", "Lab Technician"],
  Pharmacy: ["Pharmacist", "Inventory Manager"],
};

export const getRolesByDepartment = async (req, res) => {
  const { department } = req.params;
  const roles = departmentRoles[department] || [];
  res.json(roles);
};

export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
