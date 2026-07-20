import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("shiva_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => {
  const contentType = response.headers["content-type"] || "";

  if (contentType.includes("text/html")) {
    return Promise.reject(new Error("The API returned the website instead of data."));
  }

  return response;
});

export default api;
