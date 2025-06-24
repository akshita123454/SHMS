import axios from "axios";

const API = "http://localhost:3000/api/staff";

export const fetchStaff = () => axios.get(API);
export const addStaff = (staff) => axios.post(API, staff);
export const updateStaff = (id, updates) => axios.put(`${API}/${id}`, updates);
export const deleteStaff = (id) => axios.delete(`${API}/${id}`);
