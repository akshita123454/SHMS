// src/api/emergency/triage.js
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

// ✅ POST: Register Triage Case
export const registerTriageCase = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/emergency/triage`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error in registering triage case:", error);
    throw error;
  }
};

// ✅ GET: Fetch All Triage Cases
export const getAllTriageCases = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/emergency/triage`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching triage cases:", error);
    throw error;
  }
};
