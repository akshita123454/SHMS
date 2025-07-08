import Billing from '../models/billings.model.js';

export const getAllBillings = async (req, res) => {
  const data = await Billing.find();
  res.json(data);
};

export const createBilling = async (req, res) => {
  const newRecord = new Billing(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
