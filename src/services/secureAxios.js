import axios from "axios";
import { auth } from "../firebase/firebase";
import { getIdToken } from "firebase/auth";

const secureAxios = axios.create();

secureAxios.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default secureAxios;
