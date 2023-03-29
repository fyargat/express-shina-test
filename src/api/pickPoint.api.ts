import { CancelTokenSource } from "axios";

import { $axios } from "@/api/instanse";

export const fetchData = async (source: CancelTokenSource) => {
  const response = await $axios.get(`/pickpoints/`, {
    cancelToken: source.token,
  });
  return response.data;
};
