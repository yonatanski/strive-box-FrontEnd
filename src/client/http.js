import axios from "axios";
import { BACKEND_URL } from "const/env";

const backend = axios.create({
  baseURL: BACKEND_URL,
});

export default backend;
