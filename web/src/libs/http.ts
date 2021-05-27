import axios from "axios";
import { message } from "ant-design-vue";
import router from "../router";

axios.interceptors.response.use(
  async (response) => {
    if (response.status == 200) {
      return Promise.resolve(response.data);
    } else if (response.status == 400) {
      return message.warn(response.data.message);
    } else if (response.status == 403) {
      message.warn(response.data.message);
      return router.push({ name: "login" });
    } else if (response.status == 404) {
      return message.error("not found");
    } else if (response.status == 405) {
      return message.error("method not allow");
    } else if (response.status == 429) {
      return message.error("接口请求频繁");
    }
  },
  (error) => {
    return Promise.resolve(error.response);
  }
);

const baseURL =
  import.meta.env.VITE_ENV == "dev"
    ? "http://localhost:8081"
    : "http://localhost:8081";

interface IData {
  [key: string]: any;
}

export default {
  post(url: string, data: IData) {
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
          reslove(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  get(url: string, params: IData) {
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
          reslove(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  put(url: string, data: IData) {
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
          reslove(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(url: string, data: IData) {
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
          reslove(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
