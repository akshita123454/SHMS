import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  schedule: {
    type: Map,
    of: String, // Example: { Monday: '10:00 AM - 1:00 PM' }
    default: {},
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
