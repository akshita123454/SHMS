// src/api/emergency/notifications.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const getAllNotifications = async () => {
  const res = await axios.get(`${BASE_URL}/emergency/notifications`, {
    withCredentials: true
  });
  return res.data;
};
