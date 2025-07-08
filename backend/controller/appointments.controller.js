import Appointment from '../models/appointments.model.js';

export const getAllAppointments = async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
};

export const createAppointment = async (req, res) => {
  const newRecord = new Appointment(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
};
