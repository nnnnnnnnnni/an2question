import axios from "axios";
import { message } from "ant-design-vue";
import router from "../router";

axios.interceptors.response.use(
  async (response) => {
    const code = response.data.code;
    if (code == 200) {
      return Promise.resolve(response.data);
    } else if (code == 403 || code == 401) {
      message.warn(response.data.message);
      router.push({ name: "login" });
    } else if (response.status == 404 || code == 404) {
      message.warn("NOT FOUND");
      return Promise.resolve(response.data);
    } else {
      message.error(response.data.msg);
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    return Promise.resolve(error.response);
  }
);

const baseURL = 'http://localhost:8081'

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
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
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
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
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
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
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
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};