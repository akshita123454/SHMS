import axios from "axios";
const API = "http://localhost:3000/api/staff";

export const fetchStaff = async () => {
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
};

export const addStaff = async (staff) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const { data } = await axios.post(API, staff, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return { data };
};

export const updateStaff = async (id, updates) => {
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
};

export const deleteStaff = async (id) => {
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
};

export const fetchDepartmentByRole = async (role) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const { data } = await axios.get(`${API}/roles/${role}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return { data };
};
