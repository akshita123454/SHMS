// src/api/reception/room.js
import axios from '../axios'; // ✅ updated import

const BASE_URL = 'http://localhost:3000'; // Update if backend URL changes

// ✅ Book a room for a patient
export const bookRoom = async ({ roomType, bedType, roomNumber, patientId, patientName }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/book-room`, {
      roomType,
      bedType,
      roomNumber,
      patientId,
      patientName,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error booking room:', error);
    throw error;
  }
};

// ✅ Check status of a room (Available / Occupied / Limited)
export const checkRoomAvailability = async ({ roomType, bedType, roomNumber }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/check-room`, {
      roomType,
      bedType,
      roomNumber,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data.status; // Expected: 'Available' | 'Occupied' | 'Limited'
  } catch (error) {
    console.error('❌ Error checking room availability:', error);
    return 'Error';
  }
};

// ✅ Get all room booking status (for displaying booked rooms)
export const getAllRoomStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/room-status`, {
      withCredentials: true,
    });
    return response.data; // Expected: [{ roomNumber, patientName, patientId, status }]
  } catch (error) {
    console.error('❌ Failed to fetch all room statuses:', error);
    return [];
  }
};

// ✅ Get available rooms list (optional, based on type)
export const getAvailableRooms = async ({ roomType, bedType }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reception/available-rooms`, {
      roomType,
      bedType,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data; // Expected: [{ roomNumber }]
  } catch (error) {
    console.error('❌ Failed to fetch available rooms:', error);
    return [];
  }
};
