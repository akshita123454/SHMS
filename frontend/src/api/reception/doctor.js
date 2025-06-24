// src/api/reception/doctor.js
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const getAllDepartmentsWithDoctors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/doctors/departments`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch departments and doctors:', error);
    throw error;
  }
};

export const getDoctorSchedule = async (doctorName) => {
  try {
    const response = await axios.get(`${BASE_URL}/reception/doctors/schedule/${encodeURIComponent(doctorName)}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch doctor schedule:', error);
    throw error;
  }
};
