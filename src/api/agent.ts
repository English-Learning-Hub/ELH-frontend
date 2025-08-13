import axios, { AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL + '/api',
  withCredentials: true,
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

agent.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default agent;
