import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { createApi } from "@reduxjs/toolkit/query/react";
// some changes =-----------------------
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["skill", "project"],
  endpoints: () => ({}),
});
