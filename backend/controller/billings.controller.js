import Billing from '../models/billings.model.js';

// Add billing entry
export const addBillingEntry = async (req, res) => {
  const { patient, service, amount, status } = req.body;

  if (!patient || !service || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const billingEntry = new Billing({ patient, service, amount, status });
    await billingEntry.save();
    res.status(201).json(billingEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all billing entries
export const getAllBillingEntries = async (req, res) => {
  try {
    const entries = await Billing.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
