import axios from "axios";
//Realizar peticiones HTTP a la API de backend Python
const api = axios.create({
  baseURL: "http://localhost:8000/api", //  backend Python 
});

export default api;