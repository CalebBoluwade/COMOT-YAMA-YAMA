import { createApi } from "@reduxjs/toolkit/query/react";
import { registerData, serverData } from "../../utils/schemas/Types";
import axiosBaseQuery from "./API";
const tempUrl = "http://192.168.0.106:1732/api/v1";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: axiosBaseQuery({
    baseUrl: tempUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/join",
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
    validateRefCode: builder.mutation<any, { ref: string }>({
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

export const {
  useLoginMutation,
  useRegisterMutation,
  useGenerateRefCodeMutation,
  useValidateRefCodeMutation,
  useServerStatusQuery,
} = UserAuthApi;
