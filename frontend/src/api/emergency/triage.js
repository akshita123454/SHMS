// src/api/emergency/triage.js
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

// POST
export const registerTriageCase = async (data) => {
  try{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await axios.post(`${BASE_URL}/emergency/triage`, data,{
      // also add headers to work fine.
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;

  }catch(error){
    console.log("error in registering the case:"+error);
  }
};

// GET (optional for viewing)
export const getAllTriageCases = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/emergency/triage`,{
        // also add headers to work fine.
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
    return response.data;

  } catch(error){
    console.log("error in registering the case:"+error);
  }
};