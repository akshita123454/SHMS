import axios from "axios";

const API = "http://localhost:3000/api/emergencies";

export const fetchEmergencies = () => axios.get(API);
export const addEmergency = (emergency) => axios.post(API, emergency);
export const updateEmergency = (id, updates) =>
  axios.put(`${API}/${id}`, updates);
export const deleteEmergency = (id) => axios.delete(`${API}/${id}`);
