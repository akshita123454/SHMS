// src/api/events.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events!', error);
    throw error;
  }
};

