import axios from 'axios';
import {describeSuccessResponse, describeErrorResponse} from './logger';
import {showMessage} from 'react-native-flash-message';
import {store} from '../redux/store';
import {NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {API_DOMAIN} from '@util';

const apiChatBot = axios.create();

export const BASEURL = `https://${API_DOMAIN}/`;

apiChatBot.interceptors.request.use(
  async (config: any) => {
    config.baseURL = BASEURL;
    const state = store.getState();
    //@ts-ignore
    const token = state?.auth?.token;
    if (token) {
      config.headers = {
        Authorization: token,
        'Content-Type': 'application/json',
        ...config.headers,
      };
    }
    if (config?.method?.toUpperCase() === 'GET') {
      config.params = {...config.params};
    }
    return config;
  },
  error => Promise.reject(error),
);

apiChatBot.interceptors.response.use(
  //response success
  function (response: any) {
    //Hàm log trả về response (Có thể bật và tắt trong file logger)
    describeSuccessResponse(response);
    try {
      return response?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  //error
  function (error) {
    const {message} = error?.response?.data;
    //Check status code trả về là 503 thì điều hướng tới màn hình lỗi server
    if (error?.response?.status == 503 || error?.response?.data?.code === 503) {
      NavigationUtils.navigate(ROUTE_NAME.NETWORK_ERR, {
        message: message ? message : '',
      });
    } else {
      showMessage({
        message: message ? message : 'Network Error',
        type: 'danger',
      });
    }
    //Hàm log trả về error (Có thể bật và tắt trong file logger)
    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

export default apiChatBot;
