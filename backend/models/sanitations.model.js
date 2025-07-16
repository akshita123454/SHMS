import mongoose from 'mongoose';

const sanitationSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isSanitized: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Sanitation = mongoose.model('Sanitation', sanitationSchema);
export default Sanitation;
