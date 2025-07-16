import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  age: Number,
  gender: String,
  maritalStatus: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  nationality: String,

  // Contact
  email: String,
  phone: String,
  emergencyName: String,
  emergencyPhone: String,
  emergencyRelation: String,

  // Insurance
  insuranceProvider: String,
  plan: String,
  policyNumber: String,
  groupNumber: String,
  insuredName: String,
  insuredPhone: String,
  insuredDOB: Date,

  // Lifestyle
  smoker: String,
  alcoholPerWeek: String,
  caffeinePerDay: String,
  recreationalDrugs: String,

  // Medical
  allergies: String,
  currentMedications: String,
  bloodGroup: String,
  conditions: String,

  // Room Allotment
  roomType: String,
  bedType: String,
}, {
  timestamps: true
});

export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
