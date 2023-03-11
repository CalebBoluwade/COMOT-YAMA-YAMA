import { createApi } from "@reduxjs/toolkit/query/react";
import { WasteBinData } from "../../utils/schemas/Types";
import {axiosBaseQuery, tempUrl, prodUrl} from "./API";

export const DisposeRecycleAPI = createApi({
  reducerPath: "DisposeRecycleAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl,
  }),
  endpoints: (builder) => ({
    disposalBin: builder.mutation<any, WasteBinData>({
      query: (payload) => ({
        url: "/dispose/wastebin",
        method: "POST",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    fetchBinMaterials: builder.query<any, { token: string}>({
      query: ({token}) => ({
        url: "/dispose/materials",
        token: token,
        method: "GET",
        data: "",
        body: null,
        params: null,
      })
    }),
    fetchUserBin: builder.query<any, {id: string}>({
      query: ({id}) => ({
        url: `/dispose/user/list/${id}`,
        token: "",
        method: "GET",
        data: "",
        body: null,
        params: "",
      }),
    }),
    fetchVendorBin: builder.query<WasteBinData[], {id: string}>({
      query: (payload) => ({
        url: `/dispose/vendor/list/${payload.id}`,
        token: "",
        method: "GET",
        data: "",
        body: null,
        params: "",
      }),
    }),
  }),
});

export const {
  useFetchBinMaterialsQuery,
  useDisposalBinMutation,
  useFetchUserBinQuery,
  useFetchVendorBinQuery
} = DisposeRecycleAPI;
