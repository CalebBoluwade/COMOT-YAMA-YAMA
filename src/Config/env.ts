import { DEV_BASE_URL, PROD_BASE_URL, API_KEY, API_KEY2 } from "@env";

const devEnv = {
  API_KEY,
  API_KEY2,
  DEV_BASE_URL
};

const prodEnv = {
  PROD_BASE_URL,
  API_KEY2,
  API_KEY
};

export default __DEV__ ? devEnv : prodEnv;
