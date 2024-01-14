import axios from "axios";
export const http = axios.create({
  baseURL: "http://localhost:3011",
  timeout: 5000,
});
