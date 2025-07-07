// src/api/reception/billing.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";


export const addBillingEntry = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/reception/billing`, data, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add billing entry:', error);
    throw error;
  }
};

export const getAllBillingEntries = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/billing`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch billing entries:', error);
    throw error;
  }
};
