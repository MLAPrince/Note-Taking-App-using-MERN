import axios from "axios";


// const axiosInstance  ===>>> The following function can also be named as this. 

const BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_BACKEND_BASE_URL;

if (!BASE_URL) {
    console.error("VITE_BACKEND_BASE_URL is not defined in environment variables for production mode.");
}

const api = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});
    
export default api;
