// src/api/reception/attendance.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const markAttendance = async (staff) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/reception/attendance`,
      staff,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error('❌ Error marking attendance:', err);
    throw err;
  }
};

export const getTodaysAttendance = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reception/attendance/today`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching attendance:', err);
    throw err;
  }
};


// Register a new patient with complete details
export const registerPatient = async (data) => {
  try {
    console.log("working upto here1");

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    console.log("working upto here");
    const response = await axios.post(`${BASE_URL}/reception/patients`, data, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    })
    c
    return response.data;
  } catch (error) {
    console.error('Failed to register patient:', error);
    throw error;
  }
};

// Get all registered patients (optional for admin/reception views)
export const getAllPatients = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/patients`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch patients:', error);
    throw error;
  }
};
