import axios from "axios";

const fetchApi = axios.create({
  baseURL: process.env.REACT_APP_FLASK_URL,
  withCredentials: true,
});

export default fetchApi;
