// src/api/reviews.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reviews!', error);
    throw error;
  }
};

