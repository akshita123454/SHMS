import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'doctor', 'reception', 'patient','developer','emergency'],
    default: 'patient',
  },
  contact: {
      type: String,
      required: true,
    },
  baseSalary: {
      type: Number,
      required: true,
    },
  department: { type: String, required: true },
  employeeId: {
      type: String,
      unique: true,
      required: true,
      default: () => `EMP${Date.now()}`,
    },
   
},
 { timestamps: true }
);


// Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = function (enteredPassword) { 
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
