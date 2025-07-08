import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Doctor', DoctorSchema);
