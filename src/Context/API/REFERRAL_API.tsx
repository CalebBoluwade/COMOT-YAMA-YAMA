import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterData, serverData } from "../../utils/schemas/Types";
import {axiosBaseQuery, tempUrl, prodUrl} from "./API";

export const UserRefApi = createApi({
  reducerPath: "UserRefApi",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl,
  }),
  endpoints: (builder) => ({
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

  }),
});

export const {
  useGenerateRefCodeMutation,
  useValidateRefCodeMutation,
} = UserRefApi;
