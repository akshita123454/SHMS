import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const checkRoomAvailability = async ({ roomType, bedType }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/room-availability`, {
      roomType,
      bedType,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data.status;
  } catch (error) {
    console.error('Failed to check room availability:', error);
    throw error;
  }
};
