import axios from "axios";

const API = "http://localhost:3000/api/payroll";

export const fetchPayrolls = () => axios.get(API);
export const addPayroll = (payroll) => axios.post(API, payroll);
export const updatePayroll = (id, updates) =>
  axios.put(`${API}/${id}`, updates);
export const deletePayroll = (id) => axios.delete(`${API}/${id}`);
