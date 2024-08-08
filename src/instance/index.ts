import axios from "axios";
const Axios = axios.create({
  baseURL: "https://contagemsalvador.vercel.app/",
  timeout: 1000,
});

export default Axios;
