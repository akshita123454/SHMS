// src/api/reception/register.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const registerPatient = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/patients`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register patient:', error);
    throw error;
  }
};

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/patients`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};
