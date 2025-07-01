// src/api/emergency/notifications.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const getAllNotifications = async () => {
  try{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const res = await axios.get(`${BASE_URL}/emergency/notifications`,{
      // also add headers to work fine.
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  return res.data;
  } catch(error){
      console.log("error in fetching the notifications:"+error);
  }
  
};
