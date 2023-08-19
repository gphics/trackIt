import axios from "axios";

const instance = axios.create({
    baseURL: "https://trackit-api.onrender.com"
})

export default instance