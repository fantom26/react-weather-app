import { toaster } from "@/components/ui/toaster.tsx";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

export const client = (() => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });
})();

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    if (apiKey) {
      config.headers.ApiKeyAuth = apiKey;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { code, message } = error.response.data as {
        code: number;
        message: string;
      };

      const errorMessages: Record<number, string> = {
        1003: "Parameter 'q' not provided.",
        1005: "API request URL is invalid.",
        1006: "No location found matching parameter 'q'.",
        9000: "JSON body passed in bulk request is invalid. Please make sure it is valid JSON with UTF-8 encoding.",
        9001: "JSON body contains too many locations for bulk request. Please keep it below 50 in a single request.",
        9999: "Internal application error.",
        1002: "API key not provided.",
        2006: "API key provided is invalid.",
        2007: "API key has exceeded calls per month quota.",
        2008: "API key has been disabled.",
        2009: "API key does not have access to the resource. Please check the pricing page for what is allowed in your API subscription plan."
      };

      if (Object.prototype.hasOwnProperty.call(errorMessages, code)) {
        toaster.create({ title: errorMessages[code], type: "error" });
      } else {
        console.error(`Unexpected Error ${code}: ${message}`);
      }
    } else {
      console.error("Network or unexpected error: ", error.message);
      alert(
        "A network error occurred. Please check your connection and try again."
      );
    }

    return Promise.reject(error);
  }
);

const request = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
