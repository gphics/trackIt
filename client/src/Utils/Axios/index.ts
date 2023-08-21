import axios from "axios";

const Axios = axios.create({
    baseURL: "https://trackit-api.onrender.com"
})

export default Axios