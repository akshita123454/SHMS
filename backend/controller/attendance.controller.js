import Attendance from '../models/attendance.model.js';

// 📌 Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const { id, name, role, department, status } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already marked
    const exists = await Attendance.findOne({ id, date: today });
    if (exists) {
      return res.status(400).json({ message: 'Attendance already marked for today.' });
    }

    const newRecord = new Attendance({ id, name, role, department, status, date: today });
    await newRecord.save();
    res.status(201).json({ message: 'Attendance marked successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark attendance.' });
  }
};

// 📌 Get all today's attendance
export const getTodaysAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const records = await Attendance.find({ date: today });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance.' });
  }
};
