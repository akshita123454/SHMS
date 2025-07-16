import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Staff ID
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, enum: ['Present', 'On Leave'], required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) } // Start of today
});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
export default Attendance;
