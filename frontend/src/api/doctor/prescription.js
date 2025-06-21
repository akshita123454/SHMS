import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const createPrescription = async (data) => {
  try {
    // TODO: FOR ALL OTHERS ROUTES AS WELL
    // to protect the route extract the token to allow to the edit.
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    // upto here in all router

    const response = await axios.post(`${BASE_URL}/doctor/prescriptions`, data, {
      // also add headers to work fine.
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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

    const user = JSON.parse(localStorage.getItem('user')); 
    const token = user?.token;

    const response = await axios.get(`${BASE_URL}/doctor/prescriptions`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    throw error;
  }
};



