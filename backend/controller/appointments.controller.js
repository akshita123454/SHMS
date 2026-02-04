import Appointment from '../models/appointments.model.js';

// Get all appointments
export const getAllAppointments = async (req, res) => {
  console.log("Fetching all appointments");
  try {
    const appointments = await Appointment.find();
    console.log(appointments);
    res.status(200).json({
      status: "success",
      nbHits: appointments.length,
      appointments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book new appointment
export const bookAppointment = async (req, res) => {
  const { name, date, time } = req.body;

  console.log("Booking appointment:", req.body);
  if (!name || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAppointment = new Appointment({ name, date, time });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Appointment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
