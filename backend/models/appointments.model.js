import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  time: {
    type: String, // HH:MM
    required: true,
  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
