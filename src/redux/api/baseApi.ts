import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

import { createApi } from "@reduxjs/toolkit/query/react";
// some changes =-----------------------
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["gift", "sale", "coupon"],
  endpoints: () => ({}),
});
