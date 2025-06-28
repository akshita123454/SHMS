import axios from "axios";

const API = "http://localhost:3000/api/reports";

export const fetchDashboardStats = () => axios.get(`${API}/dashboard`);
