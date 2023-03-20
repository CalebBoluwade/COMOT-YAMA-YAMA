import { createApi } from "@reduxjs/toolkit/query/react";
import { WasteBinData } from "../../utils/schemas/Types";
import {axiosBaseQuery, tempUrl, prodUrl} from "./API";

export const DisposeRecycleAPI = createApi({
  reducerPath: "DisposeRecycleAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl,
  }),
  endpoints: (builder) => ({
    disposalBin: builder.mutation<any, {payload: WasteBinData, token: string}>({
      query: ({payload, token}) => ({
        url: "/dispose/wastebin",
        method: "POST",
        token: token,
        data: "",
        body: payload,
        params: null,
      }),
    }),
    fetchBinMaterials: builder.query<any, { token: string}>({
      query: ({token}) => ({
        url: "/list/bin/items",
        token: token,
        method: "GET",
        data: "",
        body: null,
        params: null,
      })
    }),
    fetchBin: builder.query<{data:WasteBinData[]}, {id: string, type: string}>({
      query: ({id, type}) => ({
        url: `/dispose/list/${type === "USER" ? "user" : "vendor" }/${id}`,
        token: "",
        method: "GET",
        data: "",
        body: null,
        params: "",
      }),
    }),
    updateBin: builder.mutation<any, {id: string | undefined, status: string, date?: number, address?: any, owner: string, token: string}>({
      query: ({id, status, token, owner, date, address}) => ({
        url: `/update/bin/${id}`,
        token: token,
        method: "PATCH",
        data: "",
        body: {status: status, owner: owner, date: date, address},
        params: "",
      }),
      transformErrorResponse: ((err) => {
        console.log(err)
      })
    }),
  }),
});

export const {
  useFetchBinMaterialsQuery,
  useDisposalBinMutation,
  useFetchBinQuery,
  useUpdateBinMutation
} = DisposeRecycleAPI;
