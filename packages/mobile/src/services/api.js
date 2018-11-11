import axios from "axios";

// ANDROID com Emulador da SDK: 10.0.2.2
// ANDROID com Genymotion: 10.0.3.2

const api = axios.create({
  baseURL: "http://10.0.3.2:3000"
});

export default api;
