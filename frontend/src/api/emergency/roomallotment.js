// src/api/emergency/roomAllotment.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

// POST: Allot a room
export const allotRoom = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/emergency/room-allotment`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to allot room:', error);
    throw error;
  }
};

// GET: All room allotments (optional)
export const getAllRoomAllotments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/emergency/room-allotment`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room allotments:', error);
    throw error;
  }
};
