// File: src/models/prescriptionModel.js
import mongoose from "mongoose";

const Prescription_Schema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  referral: { type: String },
  medication: { type: String, required: true },
  labTests: { type: String },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model("Prescription_Schema", Prescription_Schema);
// exports = mongoose.model('Prescription_Schema', Prescription_Schema)