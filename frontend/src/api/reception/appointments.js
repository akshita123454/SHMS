// src/api/reception/appointments.js
import axios from '../axios'; // ✅ updated import

const BASE_URL = 'http://localhost:3000';

// TODO: API routes of the recpition not under admin.


// Get all appointments
export const getAllAppointments = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/reception/appointments`, data, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
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
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
  
    const response = await axios.get(`${BASE_URL}/reception/appointments`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
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
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.delete(`${BASE_URL}/reception/appointments/${id}`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error cancelling appointment:', err);
    throw err;
  }
};
