import api from '../api';

const GET_LIST_ROOM = 'user/chat/rooms';
const GET_LIST_USER = 'user/list';
const CREATE_ROOM = 'user/chat/create-room';
const REMOVE_USER = 'user/chat/room/remove-member';
const DETAIL_ROOM_CHAT = 'user/chat/room';
const UPDATE_INFO_ROOM_CHAT = 'user/chat/room/update-info';
const INVITE_MEMBER = 'user/chat/room/invite-member';
const PIN_FLAG = 'user/chat/room/pin-flag';
const UPDATE_MUTE_FLAG = 'user/chat/room/update-mute-flag';
const LEAVE_ROOM = 'user/chat/room/leave';
const UPDATE_IMAGE_ROOM_CHAT = 'user/chat/room/update-avatar';
const DETAIL_CHAT = 'user/chat/room';
const DELETE_MESSAGE = 'user/chat/room/delete-message';
const SEND_MESSAGE = 'user/chat/room/send-message';
const PIN_MESSAGE = 'user/chat/room/pin-message';
const GET_MESSAGE_FROM_SOCKET = 'user/chat/get_chat_message_info_for_websocket';
const REPLY_MESSAGE = 'user/chat/room/reply-message';
const EDIT_MESSAGE = 'user/chat/room/update-message';
const SEND_REACTION = 'user/chat/room/send-reaction-message';
const GET_LIST_REACTION = 'user/chat/room/list-reactions';
const REMOVE_REACTION = 'user/chat/room/remove-reaction-message';
const SEND_LABEL = 'user/chat/room/send-label-message';
const GET_RESULT_SEARCH_MESSAGE = 'user/chat/room';
const REGISTER_LAST_MESSAGE = 'user/chat/room';
const GET_LIST_USER_SEEN = 'user/chat/room/list-users-seen';
const GET_INVITE_LINK = 'user/chat/room/get-invitation-link';
const SEARCH_MESSAGE_LIST_ROOM = 'user/chat/search-message';
const ADD_BOOKMARK = 'user/chat/room/bookmark';
const LIST_BOOKMARK = 'user/chat/room/bookmarks';
const DELETE_BOOKMARK = 'user/chat/room/unbookmark';
const LIST_IMAGE_INROOM = 'user/chat/room';
const LIST_FILE_INROOM = 'user/chat/room';
const LIST_LINK_INROOM = 'user/chat/room';
const DELETE_ROOM = 'user/chat/room';
const CHANGE_ROLE = 'user/chat/room/role-user';
const USER_OF_ROOM = 'user/chat/room';
const GET_LIST_TASK = 'tasks/get-task-list';
const SAVE_TASK = 'tasks/save-task';
const UPDATE_TASK = 'tasks/update-task';

const GET_LIST_CATEGORY = 'user/chat/category/list';
const CREATE_CATEGORY = 'user/chat/category/create';
const DETAIL_CATEGORY = 'user/chat/category';
const EDIT_CATEGORY = 'user/chat/category/update';
const DELETE_CATEGORY = 'user/chat/category';
const GET_UNREAD_MESSAGE_COUNT_ALL = 'user/chat/get_unread_message_count_all';
const LOG_MESSAGE = 'user/chat/irregular-message-report';
const CALL_CHAT_BOT = 'user/chat/notification';
const SEND_MESSAGE_ERROR_LOG = 'user/chat/send-message-error-log';

export const getRoomListApi: any = async (params: any) => {
  const {key, company_id, page, type, category_id} = params;

  const URL_KEY = `${GET_LIST_ROOM}?company_id=${company_id}&page=${
    page ? page : 1
  }&type=${type ? type : 0}&search=${key}`;
  const URL_NO_KEY = `${GET_LIST_ROOM}?company_id=${company_id}&page=${
    page ? page : 1
  }&type=${type ? type : 0}`;
  const URL_CATEGORY =
    key?.length > 0
      ? `${URL_KEY}&category_id=${category_id}`
      : `${URL_NO_KEY}&category_id=${category_id}`;
  const URL_NO_CATEGORY = key?.length > 0 ? `${URL_KEY}` : `${URL_NO_KEY}`;

  const response = await api.get(
    category_id ? `${URL_CATEGORY}` : `${URL_NO_CATEGORY}`,
  );
  return response;
};

export const getListUser: any = async (params: any) => {
  const response = api.get(GET_LIST_USER, {params});
  return response;
};

export const getListUserOfRoomApi: any = async (id: any) => {
  const response = api.get(`${USER_OF_ROOM}/${id}/users`);
  return response;
};

export const createRoom: any = async (body: any) => {
  const response = api.post(CREATE_ROOM, body);
  return response;
};

export const removeUser: any = async (body: any) => {
  const response = api.post(REMOVE_USER, body);
  return response;
};

export const detailRoomchat: any = async (id: any) => {
  const response = await api.get(`${DETAIL_ROOM_CHAT}/${id}`);
  return response;
};

export const updateInfoRoomchat: any = async (body: any) => {
  const response = api.post(UPDATE_INFO_ROOM_CHAT, body);
  return response;
};

export const inviteMember: any = async (body: any) => {
  const response = api.post(INVITE_MEMBER, body);
  return response;
};

export const pinFlag: any = async (id: any, status: any) => {
  const response = api.get(`${PIN_FLAG}/${id}?status=${status}`);
  return response;
};

export const updateMuteFlag: any = async (body: any) => {
  const response = api.post(UPDATE_MUTE_FLAG, body);
  return response;
};

export const leaveRoomChat: any = async (body: any) => {
  const response = api.post(LEAVE_ROOM, body);
  return response;
};

export const updateImageRoomChat: any = async (body: any) => {
  const response = api.post(UPDATE_IMAGE_ROOM_CHAT, body);
  return response;
};

export const getDetailChatApi: any = async (params: any) => {
  const {id, page, key} = params;
  const response = api.get(
    key?.length > 0
      ? `${DETAIL_CHAT}/${id}/message?page=${page ? page : 1}&key=${
          key ? key : ''
        }`
      : `${DETAIL_CHAT}/${id}/message?page=${page ? page : 1}`,
  );
  return response;
};

export const getListUserChatApi: any = async (params: any) => {
  const response = await api.get(GET_LIST_USER, {params});
  return response;
};

export const deleteMessageApi: any = async (idMessage: any, idRoom: any) => {
  const response = api.post(`${DELETE_MESSAGE}/${idMessage}?room_id=${idRoom}`);
  return response;
};

export const editMessageApi: any = async (idMessage: any, params: any) => {
  const response = api.post(`${EDIT_MESSAGE}/${idMessage}`, params);
  return response;
};

export const sendMessageApi: any = async (body: any) => {
  const response = api.post(SEND_MESSAGE, body);
  return response;
};

export const pinMessageApi: any = async (id: any, status: any) => {
  const response = api.get(`${PIN_MESSAGE}/${id}?pin_flag=${status}`);
  return response;
};

export const getMessageFromSocket: any = async (body: any) => {
  const response = api.post(GET_MESSAGE_FROM_SOCKET, body);
  return response;
};

export const replyMessageApi: any = async (body: any) => {
  const response = api.post(REPLY_MESSAGE, body);
  return response;
};

export const sendReactionApi: any = async (body: any) => {
  const response = api.post(SEND_REACTION, body);
  return response;
};

export const getListReactionApi: any = async (id: any) => {
  const response = api.post(`${GET_LIST_REACTION}/${id}`);
  return response;
};

export const removeReactionApi: any = async (body: any) => {
  const response = api.post(REMOVE_REACTION, body);
  return response;
};

export const sendLabelApi: any = async (body: any) => {
  const response = api.post(SEND_LABEL, body);
  return response;
};

export const getResultSearchMessage: any = async (params: any) => {
  const {id_room, id_message} = params;
  const response = api.get(
    `${GET_RESULT_SEARCH_MESSAGE}/${id_room}/messages-after-from-id?message_from_id=${id_message}`,
  );
  return response;
};

export const registerLastMessage: any = async (data: any) => {
  const {id_room, id_message} = data;
  const response = api.post(
    `${REGISTER_LAST_MESSAGE}/${id_room}/register-last-message-id?message_id=${id_message}`,
  );
  return response;
};

export const getListUserSeen: any = async (id: any) => {
  const response = api.post(`${GET_LIST_USER_SEEN}/${id}`);
  return response;
};

export const getInviteLink: any = async (body: any) => {
  const response = api.post(GET_INVITE_LINK, body);
  return response;
};

export const searchMessageListRoom: any = async (body: any) => {
  const response = api.get(
    `${SEARCH_MESSAGE_LIST_ROOM}?key=${body.key}&page=${body?.page}&company_id=${body.idCompany}`,
  );
  return response;
};

export const addBookmark: any = async (id: any) => {
  const response = api.post(`${ADD_BOOKMARK}/${id}`);
  return response;
};

export const listBookmark: any = async (data: any) => {
  const response = api.get(
    `${LIST_BOOKMARK}?page=${data?.page}&company_id=${data.idCompany}`,
  );
  return response;
};

export const deleteBookmark: any = async (id: any) => {
  const response = api.post(`${DELETE_BOOKMARK}/${id}`);
  return response;
};

export const getListImageInroom: any = async (id: any, page: any) => {
  const response = api.get(`${LIST_IMAGE_INROOM}/${id}/images?page=${page}`);
  return response;
};

export const getListFileInroom: any = async (id: any, page: any) => {
  const response = api.get(`${LIST_FILE_INROOM}/${id}/files?page=${page}`);
  return response;
};

export const getListLinkInRoom: any = async (id: any, page: any) => {
  const response = api.get(`${LIST_LINK_INROOM}/${id}/links?page=${page}`);
  return response;
};

export const callApiChatBot: any = async (body: any) => {
  const response = api.post(`${CALL_CHAT_BOT}`, body);
  return response;
};

export const deleteRoom: any = async (id: any) => {
  const response = api.get(`${DELETE_ROOM}/${id}/delete`);
  return response;
};

export const changeRole: any = async (body: any) => {
  const response = api.post(CHANGE_ROLE, body);
  return response;
};

export const getListCategory: any = async () => {
  const response = api.get(GET_LIST_CATEGORY);
  return response;
};

export const createCategory: any = async (body: any) => {
  const response = api.post(CREATE_CATEGORY, body);
  return response;
};

export const detailCategory: any = async (id: any) => {
  const response = api.get(`${DETAIL_CATEGORY}/${id}/detail`);
  return response;
};

export const updateCategory: any = async (body: any) => {
  const response = api.post(EDIT_CATEGORY, body);
  return response;
};

export const deleteCategory: any = async (id: any) => {
  const response = api.get(`${DELETE_CATEGORY}/${id}/delete`);
  return response;
};

export const getUnreadMessageCountApi: any = async (user_id: any) => {
  const response = await api.get(
    `${GET_UNREAD_MESSAGE_COUNT_ALL}?user_id=${user_id}`,
  );
  return response;
};

export const getListTask: any = async (data: any) => {
  const response = await api.get(
    `${GET_LIST_TASK}?page=${data?.page}&company_id=${data.idCompany}&chat_room_id=${data.idRoomChat}`,
  );
  return response;
};
export const saveTask: any = async (body: any) => {
  const response = api.post(`${SAVE_TASK}`, body);
  return response;
};
export const finishTask: any = async (body: any) => {
  const response = await api.post(`${UPDATE_TASK}`, body);
  return response;
};
export const updateTask: any = async (body: any) => {
  const response = api.post(`${UPDATE_TASK}`, body);
  return response;
};
export const logMessage: any = async (body: any) => {
  const response = api.post(`${LOG_MESSAGE}`, body);
  return response;
};

export const sendMessageErrorLog: any = async (body: any) => {
  const response = api.post(`${SEND_MESSAGE_ERROR_LOG}`, body);
  return response;
};