import axios from "axios";
const Axios = axios.create({
  baseURL: "https://contagemsalvador.vercel.app/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
