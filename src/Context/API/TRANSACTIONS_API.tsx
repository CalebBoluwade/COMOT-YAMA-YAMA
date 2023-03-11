import { createApi } from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, tempUrl, prodUrl} from "./API";

export const TransactionsAPI = createApi({
  reducerPath: "TransactionsAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: __DEV__ ? tempUrl : prodUrl,
  }),
  endpoints: (builder) => ({
    fetchTransactions: builder.query<any, any>({
      query: (payload) => ({
        url: "/login",
        method: "GET",
        token: "",
        data: "",
        body: payload,
        params: null,
      }),
    }),
    processTransaction: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/join",
        token: "",
        method: "POST",
        data: "",
        body: payload,
        params: null,
      }),
      transformResponse: (response: any) => {
          
      }
    }),
  }),
});

export const {
    useFetchTransactionsQuery,
    useProcessTransactionMutation
} = TransactionsAPI;
