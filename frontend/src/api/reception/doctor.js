// src/api/reception/doctor.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const getAllDepartmentsWithDoctors = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/doctors/departments`,{
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch departments and doctors:', error);
    throw error;
  }
};

export const getDoctorSchedule = async (doctorName) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/doctors/schedule/${encodeURIComponent(doctorName)}`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch doctor schedule:', error);
    throw error;
  }
};
