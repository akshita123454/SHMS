import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true }, // General, ICU, Private
  bedType: { type: String, required: true },   // Single, Shared
  status: { type: String, default: 'Available' }, // Available, Occupied
});

const Room =  mongoose.model('Rooms', roomSchema);
export default Room;
