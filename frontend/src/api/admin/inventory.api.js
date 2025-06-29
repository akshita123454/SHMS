// frontend/src/api/admin/inventory.api.js
import axios from "axios";

const API = "http://localhost:3000/api/inventory";

export const fetchInventory = async () => {
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
    console.error("Failed to fetch inventory", err);
    throw err;
  }
};

export const addInventory = async (item) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await axios.post(API, item, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { data };
  } catch (/** @type {any} */ err) {
    console.error("Failed to add inventory", err);
    throw err;
  }
};

export const updateInventory = async (id, updates) => {
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
    console.error("Failed to update inventory", err);
    throw err;
  }
};

export const deleteInventory = async (id) => {
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
    console.error("Failed to delete inventory", err);
    throw err;
  }
};
