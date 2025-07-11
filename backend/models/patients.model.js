import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  // Personal Info
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  age: Number,
  gender: String,
  maritalStatus: String,
  nationality: String,
  bloodGroup: String,
  address: String,
  city: String,
  state: String,
  zip: String,

  // Contact
  email: String,
  phone: String,

  // Emergency Contact
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

  // Medical History
  allergies: String,
  currentMedications: String,
  conditions: String,

  // Optional Room Allotment
  roomType: String,
  bedType: String,
}, { timestamps: true });

// ✅ Safe export (prevents OverwriteModelError)
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;