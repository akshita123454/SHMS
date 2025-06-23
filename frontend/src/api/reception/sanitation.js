import axios from 'axios';
const BASE_URL = "http://localhost:3000";

// Get all rooms (sanitized and unsanitized)
export const getSanitationStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/sanitation`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sanitation status:", error);
    throw error;
  }
};

// Mark a room as sanitized
export const markRoomSanitized = async (roomNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/sanitation/sanitize`, {
      roomNumber
    });
    return response.data;
  } catch (error) {
    console.error("Error updating sanitation status:", error);
    throw error;
  }
};
