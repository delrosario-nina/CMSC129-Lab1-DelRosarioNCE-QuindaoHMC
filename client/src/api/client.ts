import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Automatically attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from memory/context
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
