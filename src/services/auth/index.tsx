import api from '../api';

const LOGIN = 'auth/login';
const LOGOUT = 'user/logout';
const UPDATE_USER_INFO = 'user/edit-profile';
const CHANGE_PASSWORD = 'user/change-password';
const UPDATE_IMAGE_PROFILE = 'user/update-avatar';
const FORGOT_PASSWORD = 'auth/forgot-password';
const GET_USER_INFO = 'user';
const CONFIG_NOTI = 'user/setting/notification-status';
const GET_LIST_COMPANY_LOGIN = 'user/company';
const SELECT_COMPANY = 'user/select-client';
const DELETE_IMAGE_USER = 'user/remove-avatar';
const DELETE_IMAGE_ROOM_CHAT = 'user/chat/room/remove-avatar';
const REGISTER_TOKENFIR = 'user/save-token';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const logOutApi: any = async () => {
  const response = await api.post(LOGOUT);
  return response;
};

export const updateProfile: any = async (data: any) => {
  const response = await api.post(UPDATE_USER_INFO, data);
  return response;
};

export const changePassword: any = async (data: any) => {
  const response = await api.post(CHANGE_PASSWORD, data);
  return response;
};

export const updateImageProfile: any = async (data: any) => {
  const response = await api.post(UPDATE_IMAGE_PROFILE, data);
  return response;
};

export const forgotPassword: any = async (data: any) => {
  const response = await api.post(FORGOT_PASSWORD, data);
  return response;
};

export const getUserInfoApi: any = async (id: any) => {
  const response = await api.get(`${GET_USER_INFO}/${id}`);
  return response;
};

export const configNoti: any = async (params: any) => {
  const response = await api.get(CONFIG_NOTI, {params});
  return response;
};

export const getListCompany: any = async (params: any) => {
  const response = await api.get(GET_LIST_COMPANY_LOGIN, {params});
  return response;
};

export const selectCompany: any = async (id: any) => {
  const response = await api.get(`${SELECT_COMPANY}/${id}`);
  return response;
};

export const deleteImageUser: any = async () => {
  const response = await api.post(DELETE_IMAGE_USER);
  return response;
};

export const deleteImageRoomChat: any = async (data: any) => {
  const response = await api.post(DELETE_IMAGE_ROOM_CHAT, data);
  return response;
};

export const registerToken: any = async (data: any) => {
  const response = await api.post(REGISTER_TOKENFIR, data);
  return response;
};
