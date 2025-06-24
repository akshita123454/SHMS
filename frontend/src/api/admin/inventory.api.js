import axios from "axios";

const API = "http://localhost:3000/api/inventory";

export const fetchInventory = () => axios.get(API);
export const addInventory = (item) => axios.post(API, item);
export const updateInventory = (id, updates) =>
  axios.put(`${API}/${id}`, updates);
export const deleteInventory = (id) => axios.delete(`${API}/${id}`);
