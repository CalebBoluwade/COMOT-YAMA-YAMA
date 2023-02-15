import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./API";
const tempUrl = "http://192.168.0.106:1732/api/v1";

export const TransactionsAPI = createApi({
  reducerPath: "TransactionsAPI",
  baseQuery: axiosBaseQuery({
    baseUrl: tempUrl,
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
    }),
  }),
});

export const {
    useFetchTransactionsQuery,
    useProcessTransactionMutation
} = TransactionsAPI;
