// src/api/reception/appointments.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

// Create a new appointment
export const bookAppointment = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/appointments`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to book appointment:', error);
    throw error;
  }
};

// Fetch all appointments
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/appointments`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};

// Cancel a specific appointment
export const cancelAppointment = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reception/appointments/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to cancel appointment:', error);
    throw error;
  }
};
