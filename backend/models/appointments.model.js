import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentSchema);
