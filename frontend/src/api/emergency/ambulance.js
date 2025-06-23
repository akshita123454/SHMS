// src/api/emergency/ambulance.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getAllAmbulances = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/emergency/ambulance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ambulances:", error);
    return [];
  }
};
