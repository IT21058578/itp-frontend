import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",

  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
    headers: { "Content-Type": "application/json; charset=utf8" },
  },
});

export default instance;
