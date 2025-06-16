// src/services/patientService.js
import api from './api';

export const getProfile = async () => {
  const response = await api.get('/api/patient/profile');
  return response.data;
};


  import axios from 'axios';

const API_URL = "http://localhost:3000/api/patients";

export const getReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports", error);
    throw error;
  }
};

