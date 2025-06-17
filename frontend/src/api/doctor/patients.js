// src/api/patients.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/doctor/patients`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch patients!', error);
    throw error;
  }
};

