import mongoose from 'mongoose';


const billingSchema = new mongoose.Schema(
  {
    patient: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending'],
      default: 'Paid',
    },
  },
  { timestamps: true }
);

const Billing = mongoose.model('Billing', billingSchema);
export default Billing;
