import axios from "axios";
import config from "./../config";

const BASE_URL = config.API_URL;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
