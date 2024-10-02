import axios from "axios"

 export const axiosInstance = axios.create({
   // local instance of firebase functions
  //  baseURL: "http://127.0.0.1:5001/netflix-clone-2024-79f20/us-central1/api",
   // deployed version of amazon server on render.com
   baseURL: "https://amazon-api-deploy-dj7w.onrender.com",
 });