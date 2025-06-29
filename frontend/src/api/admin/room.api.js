//  room.api.js
import axios from "axios";

const API = "http://localhost:3000/api/rooms";

export const fetchRooms = () => axios.get(API);
export const addRoom = (data) => axios.post(API, data);
export const updateRoom = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteRoom = (id) => axios.delete(`${API}/${id}`);
export const fetchRoomStats = () => axios.get(`${API}/stats`);
