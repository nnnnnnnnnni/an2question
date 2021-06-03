import axios, { AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import router from "../router";

export interface IResponse extends AxiosResponse {
  code?: 0 | 1;
  data: any;
  message?: string;
  timestamp?: number;
}

export const baseURL = import.meta.env.VITE_ENV == "dev" ? "/api" : "http://localhost:3001";

const Axios = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

Axios.interceptors.response.use(
  (response) => {
    if (response.data.code == 1) {
      return Promise.resolve(response.data);
    } else {
      message.error(response.data.message);
      return Promise.reject(response);
    }
  },
  (error) => {
    const response = error.response;
    if (response.status == 400) {
      return Promise.reject(response.data.message);
    } else if (response.status == 403) {
      router.push({ name: "LOGIN" });
      return Promise.reject(response.data.message);
    } else if (response.status == 404) {
      return Promise.reject("Not Fund");
    } else if (response.status == 405) {
      return Promise.reject("Method Not Allow");
    } else if (response.status == 429) {
      return Promise.reject("Frequent Interface Requests");
    } else {
      return Promise.reject("Server Failed");
    }
  }
);

interface IData {
  [key: string]: any;
}

export default {
  post(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      Axios({
        method: "POST",
        url,
        data: data,
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return message.error(err);
        });
    });
  },
  get(url: string, params: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      Axios({
        method: "GET",
        url,
        params, // get 请求时带的参数
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return message.error(err);
        });
    });
  },
  put(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      Axios({
        method: "PUT",
        url,
        data: data,
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return message.error(err);
        });
    });
  },
  delete(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      Axios({
        method: "DELETE",
        url,
        data: data,
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return message.error(err);
        });
    });
  },
};
