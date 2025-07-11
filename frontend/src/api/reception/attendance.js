// src/api/reception/attendance.js
import axios from '../axios'; // ✅ updated import

const BASE_URL = 'http://localhost:3000';

export const markAttendance = async (staff) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/reception/attendance`,
      staff,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error('❌ Error marking attendance:', err);
    throw err;
  }
};

export const getTodaysAttendance = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reception/attendance/today`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching attendance:', err);
    throw err;
  }
};
