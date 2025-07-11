import Doctor from '../models/doctors.model.js';

// GET all departments with their doctors
export const getAllDepartmentsWithDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const departments = {};

    doctors.forEach((doc) => {
      if (!departments[doc.department]) {
        departments[doc.department] = [];
      }
      departments[doc.department].push(doc.name);
    });

    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET schedule for a specific doctor
export const getDoctorSchedule = async (req, res) => {
  const { name } = req.params;

  try {
    const doctor = await Doctor.findOne({ name });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor.schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Optional) POST - Add a new doctor (for setup or admin use)
export const addDoctor = async (req, res) => {
  const { name, department, schedule } = req.body;

  if (!name || !department || !schedule) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const newDoctor = new Doctor({ name, department, schedule });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
