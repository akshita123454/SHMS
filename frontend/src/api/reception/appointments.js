// src/api/reception/appointments.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reception/appointments`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching appointments:', err);
    throw err;
  }
};

// Book a new appointment
export const bookAppointment = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/reception/appointments`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error booking appointment:', err);
    throw err;
  }
};

// Cancel an appointment
export const cancelAppointment = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/reception/appointments/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error cancelling appointment:', err);
    throw err;
  }
};
