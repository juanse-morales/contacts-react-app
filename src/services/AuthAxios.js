import UrlApi from "./UrlApi";
import axios from "axios";

const AuthAxios = axios.create({
  baseURL: UrlApi,
  
});

export default AuthAxios;