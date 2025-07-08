import mongoose from 'mongoose';

const BillingSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
}, { timestamps: true });

export default mongoose.model('Billing', BillingSchema);
