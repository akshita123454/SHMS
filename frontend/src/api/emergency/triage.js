// src/api/emergency/triage.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

// POST: Register triage case
export const registerTriageCase = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/emergency/triage`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register triage case:', error);
    throw error;
  }
};

// GET: All triage cases (optional)
export const getAllTriageCases = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/emergency/triage`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch triage cases:', error);
    throw error;
  }
};
