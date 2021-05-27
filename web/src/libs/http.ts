import axios, { AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import router from "../router";

export interface IResponse extends AxiosResponse {
  code?: 0 | 1;
  data: any;
  message?: string;
  timestamp?: number;
}

axios.interceptors.response.use(
  async (response) => {
    console.log(response)
    if (response.status == 200) {
      return Promise.resolve(response.data);
    } else if (response.status == 400) {
      return message.warn(response.data.message);
    } else if (response.status == 403) {
      message.warn(response.data.message);
      return router.push({ name: "login" });
    } else if (response.status == 404) {
      return message.error("Not Fund");
    } else if (response.status == 405) {
      return message.error("Method Not Allow");
    } else if (response.status == 429) {
      return message.error("Frequent interface requests");
    }
  },
  (error) => {
    return Promise.resolve(error.response);
  }
);

const baseURL = import.meta.env.VITE_ENV == "dev" ? "/api" : "http://localhost:3001";

interface IData {
  [key: string]: any;
}

export default {
  post(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      axios({
        method: "POST",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
  get(url: string, params: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      axios({
        method: "GET",
        baseURL: baseURL,
        url,
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
  put(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      axios({
        method: "PUT",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
  delete(url: string, data: IData): Promise<IResponse> {
    return new Promise((reslove, reject) => {
      axios({
        method: "DELETE",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return reslove(response);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
};
