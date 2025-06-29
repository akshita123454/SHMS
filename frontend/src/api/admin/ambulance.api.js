// frontend/src/api/admin/ambulance.api.js
import axios from "axios";

const API = "http://localhost:3000/api/ambulances";

// this was your before route
// export const fetchAmbulances = () => axios.get(API);

// change all the structure similar to this. make sure to add the user,token and headers.
export const fetchAmbulances = async ()=> {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const {data} = await axios.get(API,
      {
      // also add headers to work fine.
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    }
    )
    return {data:data};
  } catch (error) {
    console.error('Failed to fetch Ambulance data', error);
    throw error;
  }
}

export const addAmbulance = (ambulanceData) => axios.post(API, ambulanceData);

export const updateAmbulance = (id, updatedData) =>
  axios.put(`${API}/${id}`, updatedData);

export const deleteAmbulance = (id) => axios.delete(`${API}/${id}`);
