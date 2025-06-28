// frontend/src/api/admin/ambulance.api.js
import axios from "axios";

const API = "http://localhost:3000/api/ambulances";

export const fetchAmbulances = () => axios.get(API);

export const addAmbulance = (ambulanceData) => axios.post(API, ambulanceData);

export const updateAmbulance = (id, updatedData) =>
  axios.put(`${API}/${id}`, updatedData);

export const deleteAmbulance = (id) => axios.delete(`${API}/${id}`);
