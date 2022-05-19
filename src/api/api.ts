import axios from "axios";

const API_URL = process.env["REACT_APP_SERVER_URL"];

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});
