import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Room', RoomSchema);
