// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
// });

// // attach token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

});


// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
