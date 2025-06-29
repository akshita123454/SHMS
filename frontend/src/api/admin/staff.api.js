// src/api/admin/staff.api.js
import axios from "axios";
const API = "http://localhost:3000/api/staff";

export const fetchStaff = () => axios.get(API);
export const addStaff = (staff) => axios.post(API, staff);
export const updateStaff = (id, staff) => axios.put(`${API}/${id}`, staff);
export const deleteStaff = (id) => axios.delete(`${API}/${id}`);
export const fetchRolesByDepartment = (dept) => axios.get(`${API}/roles/${dept}`);
export const fetchDoctors = () => axios.get(`${API}/doctors`);
