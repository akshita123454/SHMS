// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // ✅ Your backend base URL
  withCredentials: true, // Optional if using cookies or JWT
});

export default instance;

