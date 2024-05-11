import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-manager-server-henna.vercel.app/api/v1/",
  }),
  tagTypes: ["contacts"],
  endpoints: () => ({}),
});
