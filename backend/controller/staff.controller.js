import Staff from "../models/staff.model.js";

// Static department-role mapping
const departmentRoles = {
  Cardiology: ["Cardiologist", "Cardiology Nurse", "Technician"],
  Radiology: ["Radiologist", "Radiology Technician"],
  HR: ["HR Manager", "Recruiter"],
  ICU: ["ICU Doctor", "ICU Nurse", "Respiratory Therapist"],
  Surgery: ["Surgeon", "Surgical Nurse", "Anesthetist"],
  Maternity: ["Gynecologist", "Maternity Nurse"],
  "General Ward": ["General Physician", "Ward Nurse", "Compounder"],
  Neurology: ["Neurologist", "Neuro Nurse"],
  Orthopedics: ["Orthopedic Doctor", "Ortho Technician"],
  Emergency: ["Emergency Doctor", "Emergency Nurse", "Paramedic", "Compounder"],
  Reception: ["Receptionist", "Front Desk Officer"],
};

// Get roles by department
export const getRolesByDepartment = async (req, res) => {
  const { department } = req.params;
  const roles = departmentRoles[department] || [];
  res.json(roles);
};

// Existing handlers
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
