import axios from "axios";


// const axiosInstance  ===>>> The following function can also be named as this. 

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
        // baseURL: "http://localhost:3000/api",
        baseURL: BASE_URL,
        // headers: {
        //     "Content-Type": "application/json",
        // },
    });
    
export default api;
