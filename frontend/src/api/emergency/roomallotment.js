import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const allotRoom = async (data) => {
  try{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const res = await axios.post(`${BASE_URL}/emergency/room`, data, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    return res.data;
  } catch(error){
    console.log("error in alloting the room"+error)
  }
};

export const getAllRoomAllotments = async () => {
  try{   
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const res = await axios.get(`${BASE_URL}/emergency/room`, {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
    return res.data;

  } catch(error){
    console.log("error in getting the all rooms Allotments "+error)
  }
};
