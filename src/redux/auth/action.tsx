import {typeAuth} from './type';

//Action login
export const login = (payload: any) => ({
  type: typeAuth.LOGIN,
  payload,
});

//Action logout
export const logOut = () => ({
  type: typeAuth.LOGOUT,
});

//Lưu token vào persit redux
export const saveToken = (payload: any) => ({
  type: typeAuth.SAVE_TOKEN,
  payload,
});

//Get thông tin user
export const getUserInfo = (payload: any) => ({
  type: typeAuth.GET_USER_INFO,
  payload,
});

//Lưu thông tin của user vào redux
export const saveInfoUser = (payload: any) => ({
  type: typeAuth.SAVE_INFO_USER,
  payload,
});
