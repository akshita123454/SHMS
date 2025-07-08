import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientRegistration = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'doctor', 'reception', 'patient','developer','emergency'],
    default: 'patient',
  },
});

// Hash password before save
patientRegistration.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
patientRegistration.methods.matchPassword = function (enteredPassword) { 
  return bcrypt.compare(enteredPassword, this.password);
};

const patientRegistration = mongoose.model('patientRegistration', patientRegistration);
export default patientRegistration;