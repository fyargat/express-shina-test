import axios from "axios";

import { API_URL } from "@/api/constants";

export const $axios = axios.create({
  baseURL: API_URL,
});
