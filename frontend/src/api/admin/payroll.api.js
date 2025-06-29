// frontend/src/api/admin/payroll.api.js
import axios from "axios";

const API = "http://localhost:3000/api/payroll";

export const fetchPayrolls = async () => {
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
    console.error("Failed to fetch payrolls", err);
    throw err;
  }
};

export const addPayroll = async (payroll) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.post(API, payroll, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to add payroll", err);
    throw err;
  }
};

export const updatePayroll = async (id, updates) => {
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
    console.error("Failed to update payroll", err);
    throw err;
  }
};

export const deletePayroll = async (id) => {
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
    console.error("Failed to delete payroll", err);
    throw err;
  }
};
