// import mongoose from 'mongoose';

// const patientSchema = new mongoose.Schema({
//   firstName: String,
//   middleName: String,
//   lastName: String,
//   dob: String,
//   age: String,
//   gender: String,
//   maritalStatus: String,
//   address: String,
//   city: String,
//   state: String,
//   zip: String,
//   nationality: String,
//   email: {
//     required: true,
//     type: String,
//     unique: true,
//   },
//   phone: String,
//   emergencyName: String,
//   emergencyPhone: String,
//   emergencyRelation: String,
//   insuranceProvider: String,
//   plan: String,
//   policyNumber: String,
//   groupNumber: String,
//   insuredName: String,
//   insuredPhone: String,
//   insuredDOB: String,
//   smoker: String,
//   alcoholPerWeek: String,
//   caffeinePerDay: String,
//   recreationalDrugs: String,
//   allergies: String,
//   currentMedications: String,
//   bloodGroup: String,
//   conditions: String,
//   roomType: String,
//   bedType: String,
// }, { timestamps: true });

// // ✅ FIX: Check if already compiled
// const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

// export default Patient;





import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  // Personal Info
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  dob: { type: String },
  age: { type: String },
  gender: { type: String },
  maritalStatus: { type: String },
  nationality: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },

  // Contact Info
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String },

  // Emergency Contact
  emergencyName: { type: String },
  emergencyPhone: { type: String },
  emergencyRelation: { type: String },

  // Insurance Details
  insuranceProvider: { type: String },
  plan: { type: String },
  policyNumber: { type: String },
  groupNumber: { type: String },
  insuredName: { type: String },
  insuredPhone: { type: String },
  insuredDOB: { type: String },

  // Lifestyle
  smoker: { type: String },
  alcoholPerWeek: { type: String },
  caffeinePerDay: { type: String },
  recreationalDrugs: { type: String },

  // Medical History
  currentMedications: { type: String },
  allergies: { type: String },
  conditions: { type: String },

  // Room Allotment (Optional)
  roomType: { type: String },
  bedType: { type: String },
}, { timestamps: true });

// Avoid recompilation in dev environment
const Patient = mongoose.model('newPatient', patientSchema);

export default Patient;
