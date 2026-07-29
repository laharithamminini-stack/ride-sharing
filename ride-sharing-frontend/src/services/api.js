
import axios from "axios";

const api = axios.create({
  baseURL: "https://ride-sharing-backend-r310.onrender.com",
});

export default api;