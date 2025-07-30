import axios from "axios";


// const axiosInstance  ===>>> The following function can also be named as this. 


const api = axios.create({
        baseURL: "http://localhost:3000/api",
        // headers: {
        //     "Content-Type": "application/json",
        // },
    });
    
export default api;