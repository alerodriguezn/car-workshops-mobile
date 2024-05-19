import axios from "axios";



const axiosClient = axios.create({
  baseURL: "http://192.168.1.29:3000/api",
});


export default axiosClient;