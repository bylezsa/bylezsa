// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// interceptor de respuestas: centraliza manejo de errores
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Puedes mejorar: mapear errores, mostrar toasts, loggear
    return Promise.reject(error);
  }
);

export default api;
