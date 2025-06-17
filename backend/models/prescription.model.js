import mongoose from 'mongoose';
const { Schema } = mongoose;

const MedicationSchema = new Schema({
  drug:       { type: String, required: true },
  directions: { type: String, required: true },
  qty:        { type: String, required: true },
  refills:    { type: String, required: true },
});

const PrescriptionSchema = new Schema({
  // Member info
  patientId:        { type: String, required: true },
  patientName:     { type: String, required: true },
  dateOfBirth:     { type: Date,   required: true },
  gender:          { type: String, enum: ['Male','Female',''], default: '' },
  phone:           { type: String , required: true},
  allergies:       { type: [String], default: [] },

  // Prescription meds
  medication: {
    type: [MedicationSchema],
    validate: {
      validator: arr => arr.length > 0,
      message: 'At least one medication line is required'
    }
  },

  // Prescriber info
  prescriberName:      { type: String, required: true },
  prescriberDate:      { type: Date },
  prescriberPhone:     { type: String },
  prescriberReview: { type: String },

}, { timestamps: true });

// Model name is “Prescription”
const Prescription = mongoose.models.Prescription ||
  mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;







// // File: src/models/prescriptionModel.js
// import mongoose from "mongoose";

// const Prescription_Schema = new mongoose.Schema({
//   patientName: { type: String, required: true },
//   doctorName: { type: String, required: true },
//   diagnosis: { type: String, required: true },
//   referral: { type: String },
//   medication: { type: String, required: true },
//   labTests: { type: String },
//   notes: { type: String }
// }, { timestamps: true });

// 
// // exports = mongoose.model('Prescription_Schema', Prescription_Schema)