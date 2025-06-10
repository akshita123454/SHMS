import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const createPrescription2 = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/doctor/prescriptions`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create prescription:', error);
    throw error;
  }
};

export const getAllPrescriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/doctor/prescriptions`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    throw error;
  }
};


















// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// export const createPrescription = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/doctor`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "include", // if you're using cookies/session
//       body: JSON.stringify(data)
//     });

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Failed to create prescription:", error);
//     throw error;
//   }
// };
