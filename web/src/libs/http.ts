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
    if (response.status == 200) {
      if(response.data.code == 1) {
        return Promise.resolve(response.data);
      } else {
        return message.error(response.data.message);
      }
    }
  },
  (error) => {
    if (error.response.status == 400) {
      return message.warn(error.response.data.message);
    } else if (error.response.status == 403) {
      message.warn(error.response.data.message);
      return router.push({ name: "LOGIN" });
    } if (error.response.status == 404) {
      return message.error("Not Fund");
    } else if (error.response.status == 405) {
      return message.error("Method Not Allow");
    } else if (error.response.status == 429) {
      return message.error("Frequent interface requests");
    } else {
      return message.error("服务器错误");
    }
  }
);

const baseURL =
  import.meta.env.VITE_ENV == "dev" ? "/api" : "http://localhost:3001";

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
