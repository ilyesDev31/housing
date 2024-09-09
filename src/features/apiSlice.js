/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["user", "listing"],
  endpoints: (builder) => ({}),
});
