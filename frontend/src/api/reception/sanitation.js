import axios from 'axios';
const BASE_URL = "http://localhost:3000";

// Get all rooms (sanitized and unsanitized)
export const getSanitationStatus = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/sanitation`,{
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sanitation status:", error);
    throw error;
  }
};

// Mark a room as sanitized
export const markRoomSanitized = async (roomNumber) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/reception/sanitation/sanitize`, {
      roomNumber
    },{
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error updating sanitation status:", error);
    throw error;
  }
};
