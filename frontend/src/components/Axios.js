import axios from "axios";

const fetchApi = axios.create({
  baseURL: `${document.getElementById("root").baseURI}/`,
});

export default fetchApi;
