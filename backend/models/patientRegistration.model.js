import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema
const patientRegSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'reception', 'patient', 'developer', 'emergency'],
    default: 'patient',
  },
});

// Pre-save hook to hash the password
patientRegSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
patientRegSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export the model with the name patientREGS
const patientREGS = mongoose.model('patientREGS', patientRegSchema);
export default patientREGS;
