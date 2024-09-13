import {typeChat} from './type';

export const getRoomList = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST,
  payload,
});

export const getRoomListSuccess = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST_SUCCESS,
  payload,
});

export const getDetailListChat = (payload: any) => ({
  type: typeChat.GET_DETAIL_LIST_CHAT,
  payload,
});

export const getDetailListChatSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_LIST_CHAT_SUCCESS,
  payload,
});

export const registerRoomChat = (payload: any) => ({
  type: typeChat.REGISTER_ROOMCHAT,
  payload,
});

export const updateRoomList = (payload: any) => ({
  type: typeChat.UPDATE_ROOMLIST,
  payload,
});

export const getListUserChat = (payload: any) => ({
  type: typeChat.GET_LIST_USER_CHAT,
  payload,
});

export const getListUserChatSuccess = (payload: any) => ({
  type: typeChat.GET_LIST_USER_CHAT_SUCCESS,
  payload,
});

export const saveListUserChat = (payload: any) => ({
  type: typeChat.SAVE_LIST_USER_CHAT,
  payload,
});

export const saveIdCompany = (payload: any) => ({
  type: typeChat.SAVE_ID_COMPANY,
  payload,
});

export const deleteMessage = (payload: any) => ({
  type: typeChat.DELETE_MESSAGE,
  payload,
});

export const editMessageAction = (payload: any) => ({
  type: typeChat.EDIT_MESSAGE,
  payload,
});

export const pinMessage = (payload: any) => ({
  type: typeChat.PIN_MESSAGE,
  payload,
});

export const saveIdRoomChat = (payload: any) => ({
  type: typeChat.SAVE_ID_ROOMCHAT,
  payload,
});

export const getDetailMessageSocket = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET,
  payload,
});

export const getDetailMessageSocketCurrent = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_CURRENT,
  payload,
});

export const getDetailMessageSocketSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_SUCCESS,
  payload,
});

export const saveMessageReply = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_REPLY,
  payload,
});

export const saveMessageEdit = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_EDIT,
  payload,
});

export const saveMessageQuote = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_QUOTE,
  payload,
});

export const resetDataChat = () => ({
  type: typeChat.RESET_DATA,
});

export const fetchResultMessageActionListRoom = (payload: any) => ({
  type: typeChat.FETCH_RESULT_SEARCH_MESSAGE_LIST_ROOM,
  payload,
});

export const fetchResultMessageActionListFile = (payload: any) => ({
  type: typeChat.FETCH_RESULT_SEARCH_MESSAGE_LIST_FILE,
  payload,
});

export const fetchResultMessageSuccess = (payload: any) => ({
  type: typeChat.RESULT_SEARCH_MESSAGE,
  payload,
});

export const saveIdMessageSearch = (payload: number) => ({
  type: typeChat.SAVE_MESSAGE_SEARCH,
  payload,
});

export const updateMessageSeen = (payload: any) => ({
  type: typeChat.UPDATE_MESSAGE_SEEN,
  payload,
});

export const getDetailMessageSocketSeen = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_SEEN,
  payload,
});

export const getDetailMessageSocketSeenSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_SEEN_SUCCESS,
  payload,
});

export const saveIsGetInfoRoom = (payload: any) => ({
  type: typeChat.SAVE_IS_GET_INFO_ROOM,
  payload,
});

export const updateMuteStatusRoom = (payload: any) => ({
  type: typeChat.UPDATE_MUTE_STATUS_ROOM,
  payload,
});

export const updateMessageReaction = (payload: any) => ({
  type: typeChat.EDIT_MESSAGE_REACTION,
  payload,
});

export const getDetailRoomSocket = (payload: any) => ({
  type: typeChat.DETAIL_ROOM_SOCKET,
  payload,
});

export const getDetailRoomSocketSuccess = (payload: any) => ({
  type: typeChat.DETAIL_ROOM_SOCKET_SUCCESS,
  payload,
});

export const showHideModalFilterListChat = (payload: any) => ({
  type: typeChat.SHOW_HIDE_MODAL_FILTER_LISTCHAT,
  payload,
});

export const saveTypeFilter = (payload: any) => ({
  type: typeChat.SAVE_TYPE_FILTER,
  payload,
});

export const saveCategoryFilter = (payload: any) => ({
  type: typeChat.SAVE_CATEGORY_FILTER,
  payload,
});

export const saveStatusFilter = (payload: any) => ({
  type: typeChat.SAVE_STATUS_FILTER,
  payload,
});

export const getUnreadMessageCount = (payload: any) => ({
  type: typeChat.GET_UNREAD_MESSAGE_COUNT_ALL,
  payload,
});

export const getUnreadMessageCountSuccess = (payload: any) => ({
  type: typeChat.GET_UNREAD_MESSAGE_COUNT_ALL_SUCCESS,
  payload,
});

export const logMessage = (payload: any) => ({
  type: typeChat.LOG_MESSAGE,
  payload,
});
