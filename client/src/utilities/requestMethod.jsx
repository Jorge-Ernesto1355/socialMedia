import axios from "axios";

export const BASE_URL = "http://localhost:3001/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});


