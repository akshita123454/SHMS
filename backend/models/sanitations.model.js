import mongoose from 'mongoose';

const SanitationSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Sanitation', SanitationSchema);
