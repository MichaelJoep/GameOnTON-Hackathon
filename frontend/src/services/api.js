import axios from "axios";


const BACKEND_URL = import.meta.env.MODE === "production" 
  ? "https://app-api.vercel.app" // Replace with your deployed backend URL
  : import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = BACKEND_URL;

axios.defaults.withCredentials = true;

export default axios;