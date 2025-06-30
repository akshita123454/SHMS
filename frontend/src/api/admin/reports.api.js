// frontend/src/api/admin/reports.api.js
import axios from "axios";

const API = "http://localhost:3000/api/reports";

export const fetchDashboardStats = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.get(`${API}/dashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to fetch dashboard stats", err);
    throw err;
  }
};
