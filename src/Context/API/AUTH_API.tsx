import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterData, serverData } from "../../utils/schemas/Types";
import {axiosBaseQuery, tempUrl, prodUrl} from "./API";
import Env from "../../Config/env";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{message: string, data: object, accessToken: string}, {user: string, password: string;}>({
      query: (payload) => ({
        url: "/users/continue",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    register: builder.mutation<any, RegisterData>({
      query: (payload) => ({
        url: "/users/join",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    verifyUser: builder.query<any, {id: string, verificationCode: string}>({
      query: (payload) => ({
        url: `/users/verify/${payload.id}/${payload.verificationCode}`,
        token: "",
        method: "GET",
        data: "",
        body: null,
        params: payload,
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
  useVerifyUserQuery,
  useServerStatusQuery
} = UserAuthApi;
