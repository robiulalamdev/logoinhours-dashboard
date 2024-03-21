import { BASE_URL } from "@/lib/api/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers) => {
    //   const token = `Bearer ${localStorage.getItem(token_name)}`;
    //   if (token) {
    //     headers.set("Authorization", token);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["landing", "pages", "sp", "global", "categories", "reviews"],
  endpoints: () => ({}),
});
