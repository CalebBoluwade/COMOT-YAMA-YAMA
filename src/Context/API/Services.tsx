import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./API";
const tempUrl = "http://192.168.0.106:1732/api/v1";

export const DisposeRecycleAPI = createApi({
  reducerPath: "DisposeRecycle",
  baseQuery: axiosBaseQuery({
    baseUrl: tempUrl,
  }),
  endpoints: (builder) => ({
    disposalBin: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    RecycleBin: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/join",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
  }),
});

export const {

} = DisposeRecycleAPI;
