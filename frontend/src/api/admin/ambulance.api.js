import axios from "axios";

const API = "http://localhost:3000/api/ambulances";

export const fetchAmbulances = () => axios.get(API);
export const addAmbulance = (ambulance) => axios.post(API, ambulance);
export const updateAmbulance = (id, updates) =>
  axios.put(`${API}/${id}`, updates);
export const deleteAmbulance = (id) => axios.delete(`${API}/${id}`);
