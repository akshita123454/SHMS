// src/api/emergency/ambulance.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getAllAmbulances = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/emergency/ambulance`,{
      // also add headers to work fine.
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ambulances:", error);
    return [];
  }
};