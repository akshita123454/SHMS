import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  diagnosis: String,
  medicines: [String],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Prescription", prescriptionSchema);
