import axios from "axios";
import { API } from "../../utils/schemas/Types";
// import { REHYDRATE } from 'redux-persist';

export const tempUrl = "http://192.168.0.106:8888/api/v1";
export const prodUrl = "https://comotyamayama.netlify.app/api/v1";

export const axiosBaseQuery =
  ({ baseUrl }: {
    baseUrl: string;
  }) =>
  async ({ url, token, method, data, body, params }: API) => {
    try {
      if (token) {
        axios.interceptors.request.use((config: any) => {
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        });
      }

      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err: any = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
