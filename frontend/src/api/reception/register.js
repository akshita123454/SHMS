import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

// Register a new patient with complete details
export const registerPatient = async (data) => {
  try {
    console.log("working upto here1");

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    console.log("working upto here");
    const response = await axios.post(`${BASE_URL}/reception/patients`, data, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    })
    c
    return response.data;
  } catch (error) {
    console.error('Failed to register patient:', error);
    throw error;
  }
};

// Get all registered patients (optional for admin/reception views)
export const getAllPatients = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/reception/patients`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch patients:', error);
    throw error;
  }
};
