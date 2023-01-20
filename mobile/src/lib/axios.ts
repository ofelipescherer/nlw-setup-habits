import axios from "axios";

export const api = axios.create({
  // No android não funciona
  // baseURL: 'http://localhost:3333'

  baseURL: "http://192.168.15.16:3333",
});
