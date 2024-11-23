import axios from "axios";

const BACKEND_URL = import.meta.env.MODE === "production"
  ? import.meta.env.VITE_BACKEND_URL
  : "http://localhost:3000";

axios.defaults.baseURL = BACKEND_URL;
axios.defaults.withCredentials = true;

export default axios;
