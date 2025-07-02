import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Patient', PatientSchema);
