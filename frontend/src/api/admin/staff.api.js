import axios from "axios";
const API = "http://localhost:3000/api/staff";

const BASE_URL = "http://localhost:3000";

export const fetchStaff = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to fetch staff", err);
    throw err;
  }
};

export const addStaff = async (staff) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    console.log(staff)

    const { data } = await axios.post(`${BASE_URL}/api/auth/signup`, staff, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to add staff", err);
    throw err;
  }
};

export const updateStaff = async (id, updates) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.put(`${API}/${id}`, updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to update staff", err);
    throw err;
  }
};

export const deleteStaff = async (id) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.delete(`${API}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to delete staff", err);
    throw err;
  }
};

export const fetchDepartmentByRole = async (role) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    // console.log("i am bing hig")

    const { data } = await axios.get(`${API}/roles/${role}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to fetch roles by department", err);
    throw err;
  }
};
