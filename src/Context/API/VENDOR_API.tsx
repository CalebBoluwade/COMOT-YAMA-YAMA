import { createApi } from "@reduxjs/toolkit/query/react";
import {
  RegisterData,
  serverData,
  VendorListData,
} from "../../utils/schemas/Types";
import { axiosBaseQuery, prodUrl, tempUrl } from "./API";

export const VendorApi = createApi({
  reducerPath: "VendorApi",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl
  }),
  endpoints: (builder) => ({
    vendorLogin: builder.mutation<
      { message: string; data: object; accessToken: string },
      { user: string; password: string }
    >({
      query: (payload) => ({
        url: "/vendor/continue",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    registerVendor: builder.mutation<RegisterData, any>({
      query: (payload) => ({
        url: "/vendor/join",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    verifyVendor: builder.mutation<
      any,
      { id: string; verificationCode: string }
    >({
      query: (payload) => ({
        url: `/users/verify/${payload.id}/${payload.verificationCode}`,
        token: "",
        method: "POST",
        data: "",
        body: null,
        params: payload,
      }),
    }),
    getAvailableVendors: builder.query<VendorListData[], void>({
      query: (payload) => ({
        url: "/vendor/find",
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
  useVendorLoginMutation,
  useGetAvailableVendorsQuery,
  useRegisterVendorMutation,
  useVerifyVendorMutation,
} = VendorApi;
