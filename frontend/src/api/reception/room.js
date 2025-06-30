import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const checkRoomAvailability = async ({ roomType, bedType }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/reception/room-availability`, {
      roomType,
      bedType,
    }, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data.status;
  } catch (error) {
    console.error('Failed to check room availability:', error);
    throw error;
  }
};
