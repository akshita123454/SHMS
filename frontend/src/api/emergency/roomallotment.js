// src/api/emergency/roomAllotment.js
// src/api/emergency/roomallotment.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const allotRoom = async (data) => {
  const res = await axios.post(`${BASE_URL}/emergency/room`, data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return res.data;
};

export const getAllRoomAllotments = async () => {
  const res = await axios.get(`${BASE_URL}/emergency/room`, {
    withCredentials: true
  });
  return res.data;
};
