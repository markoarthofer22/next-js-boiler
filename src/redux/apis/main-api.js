import axios from "axios";

const API = "www.google.hr";

export default axios.create({
    baseURL: API
});
