import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true },  // General, ICU, Private
    bedType: { type: String, required: true },   // Single, Shared
    status: { type: String, default: 'Available' }, // Available or Occupied
    patientId: { type: String },
    patientName: { type: String },
  },
  { timestamps: true }
);

// ✅ Safe export to avoid OverwriteModelError
const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
export default Room;