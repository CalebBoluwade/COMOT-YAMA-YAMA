import { createApi } from "@reduxjs/toolkit/query/react";
import { serverData } from "../../utils/schemas/Types";
import axiosBaseQuery from "./API";
const tempUrl = "http://192.168.0.106:1732/api/v1";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: axiosBaseQuery({
    baseUrl: tempUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/register",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    generateRefCode: builder.mutation({
      query: (payload) => ({
        url: "/generate/referral",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    validateRefCode: builder.mutation({
      query: (payload) => ({
        url: "/validate/referral",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    serverStatus: builder.query<serverData, void>({
      query: (payload) => ({
        url: "/ping",
        method: "GET",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useServerStatusQuery } =
UserAuthApi;
