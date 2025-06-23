// src/api/emergency/triage.js
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

// POST
export const registerTriageCase = async (data) => {
  const response = await axios.post(`${BASE_URL}/emergency/triage`, data);
  return response.data;
};

// GET (optional for viewing)
export const getAllTriageCases = async () => {
  const response = await axios.get(`${BASE_URL}/emergency/triage`);
  return response.data;
};
