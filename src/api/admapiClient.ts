
import axios from 'axios';
import { getToken } from 'src/store/admApiStore';

const apiClient = axios.create({
  baseURL: 'https://your-api-server.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 自动添加 Token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers['API-Token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export enum AdmApiUrl {
	// SignIn = "/auth/signin",
	LoginIn = "/admapi/login",
	Logout = "/admapi/logout",
	NodeList = "/admapi/node/list",
	Refresh = "/auth/refresh", // TODO add
	User = "/user", // TODO add
}

export default apiClient;