// models/emergency.models.js
import mongoose from "mongoose";

// --- Triage Schema ---
const TriageSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  insuranceProvider: String,
  severity: String,
  notes: String
}, { timestamps: true });

// --- Room Allotment Schema ---
const RoomAllotmentSchema = new mongoose.Schema({
  patientId: String,
  roomNumber: String,
  status: { type: String, default: "Occupied" }
}, { timestamps: true });

// --- Ambulance Schema ---
// Schema for Ambulance
const ambulanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  eta: { type: String, required: true },
  driverContact: { type: String, required: true }
});

// --- Notification Schema ---
const NotificationSchema = new mongoose.Schema({
  message: String
}, { timestamps: true });

// Export all models
export const Triage = mongoose.model("Triage", TriageSchema);
export const RoomAllotment = mongoose.model("RoomAllotment", RoomAllotmentSchema);
export const Ambulance = mongoose.model("Ambulance", ambulanceSchema);
export const Notification = mongoose.model("Notification", NotificationSchema);
