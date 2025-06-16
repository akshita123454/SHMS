import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  date: Date,
  status: { type: String, default: "Pending" },
});

const messageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  appointments: [appointmentSchema],
  messages: [messageSchema],
});

export default mongoose.model("Patient", patientSchema);