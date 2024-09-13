import {put, takeEvery} from 'redux-saga/effects';
import {
  getRoomListSuccess,
  getDetailListChatSuccess,
  getListUserChatSuccess,
  getDetailMessageSocketSuccess,
  deleteMessage,
  editMessageAction,
  getRoomList,
  fetchResultMessageSuccess,
  updateMessageSeen,
  getDetailMessageSocketSeenSuccess,
  getDetailRoomSocketSuccess,
  getUnreadMessageCountSuccess,
} from './action';
import {typeChat} from './type';
import {
  getRoomListApi,
  getDetailChatApi,
  getListUserChatApi,
  getMessageFromSocket,
  getResultSearchMessage,
  registerLastMessage,
  getUnreadMessageCountApi,
  detailRoomchat,
  logMessage,
} from '@services';
import {NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {store} from '../store';
import {AppSocket} from '@util';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getRoomListSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getRoomListApi(action?.payload);
    yield put(getRoomListSuccess(result?.data?.rooms));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

//AHD-11819用修正。
//チャットルームが新規作成された場合に使用デバイスとしてサーバに登録させるリクエストを送る。
function* registerRoomChatDevice(action: any) {
  const result: ResponseGenerator = yield detailRoomchat(
    action.payload.connect_room_id,
  );
  const body = {
    id_room: action.payload.connect_room_id,
    id_message: result.data.room.lastMessageJoin.id,
  };
  yield registerLastMessage(body);
}

export function* getDetailChatSaga(action: any) {
  try {
    const param = {
      id: action?.payload.id,
      page: action?.payload.page,
    };
    const result: ResponseGenerator = yield getDetailChatApi(param);
    yield put(getDetailListChatSuccess(result?.data));
    if (action?.payload.page === 1) {
      const data = {
        id_room: action?.payload.id,
        id_message: result?.data?.room_messages?.data[0]?.id ?? 0,
      };
      yield put(updateMessageSeen(data));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* getListUserChatSaga(action: any) {
  try {
    const param = {
      room_id: action?.payload.room_id,
      all: 1,
    };
    const result: ResponseGenerator = yield getListUserChatApi(param);
    yield put(getListUserChatSuccess(result?.data));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* getDetailMessageSaga(action: any) {
  try {
    const state = store.getState();
    const body = {
      message_id: action.payload?.id_message,
    };
    const result: ResponseGenerator = yield getMessageFromSocket(body);
    const data = {
      id_room: state?.chat?.id_roomChat,
      id_message: action.payload?.id_message,
    };
    yield put(updateMessageSeen(data));
    if (result?.data?.message?.del_flag === 1) {
      yield put(deleteMessage(result?.data?.message?.id));
    } else {
      if (result?.data?.message?.medthod === 1) {
        yield put(
          editMessageAction({
            id: result?.data?.message?.id,
            data: result?.data?.message,
          }),
        );
      } else {
        if (action.payload?.message_type === 3) {
          yield put(
            editMessageAction({
              id: result?.data?.message?.id,
              data: result?.data?.message,
            }),
          );
        }
        if (
          result?.data?.message?.msg_type === 10 &&
          state?.auth?.userInfo?.id === result?.data?.message?.from_id
        ) {
          NavigationUtils.navigate(ROUTE_NAME.TAB_SCREEN);
        } else {
          yield put(getDetailMessageSocketSuccess([result?.data?.message]));
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* editMessageReaction(action: any) {
  try {
    const state = store.getState();
    const body = {
      message_id: action.payload?.id_message,
    };
    const result: ResponseGenerator = yield getMessageFromSocket(body);
    const data = {
      id_room: state?.chat?.id_roomChat,
      id_message: action.payload?.id_message,
    };
    yield put(updateMessageSeen(data));
    if (result?.data?.message?.del_flag === 1) {
      yield put(deleteMessage(result?.data?.message?.id));
    } else {
      yield put(
        editMessageAction({
          id: result?.data?.message?.id,
          data: result?.data?.message,
        }),
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* getDetailMessageSagaCurrent(action: any) {
  try {
    const state = store.getState();
    const body = {
      message_id: action.payload?.id_message,
    };
    const result: ResponseGenerator = yield getMessageFromSocket(body);
    if (
      result?.data?.message?.msg_type === 10 &&
      state?.auth?.userInfo?.id === result?.data?.message?.from_id
    ) {
      NavigationUtils.navigate(ROUTE_NAME.TAB_SCREEN);
    } else if (result?.data?.message?.msg_type === 4) {
      yield put(getRoomList({company_id: state?.chat?.idCompany}));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* fetchResultMessageListFile(action: any) {
  try {
    const body = {
      id_room: action.payload.id_room,
      id_message: action.payload.id_message,
    };
    const res: ResponseGenerator = yield getResultSearchMessage(body);
    if (res?.code === 200) {
      const param = {
        id: action.payload.id_room,
        page: res?.data.pages,
      };
      const result: ResponseGenerator = yield getDetailChatApi(param);
      const valueSave = {
        data: result?.data?.room_messages?.data,
        paging: result?.data?.room_messages?.paging,
      };
      yield put(fetchResultMessageSuccess(valueSave));
      NavigationUtils.pop(2);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* fetchResultMessageListRoom(action: any) {
  try {
    const body = {
      id_room: action.payload.id_room,
      id_message: action.payload.id_message,
    };
    const res: ResponseGenerator = yield getResultSearchMessage(body);
    if (res?.code === 200) {
      const param = {
        id: action.payload.id_room,
        page: res?.data.pages,
      };
      const result: ResponseGenerator = yield getDetailChatApi(param);
      const valueSave = {
        data: result?.data?.room_messages?.data,
        paging: result?.data?.room_messages?.paging,
      };
      yield put(fetchResultMessageSuccess(valueSave));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function* updateMessageSeenSaga(action: any) {
  try {
    const state = store.getState();
    const user_id = state?.auth?.userInfo.id;
    const {getSocket} = AppSocket;
    const socket = getSocket();
    const body = {
      id_room: action.payload.id_room,
      id_message: action.payload.id_message,
    };
    yield registerLastMessage(body);
    yield socket.emit('connect_room_join_req2', {
      user_id: user_id,
      room_ids: [action.payload.id_room],
    });
    yield socket.emit('new_message_conf', {
      user_id: user_id,
      room_id: action.payload.id_room,
      task_id: null,
      message_id: action.payload.id_message,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function* getDetailMessageSeen(action: any) {
  try {
    const body = {
      message_id: action.payload?.idMsg,
    };
    const result: ResponseGenerator = yield getMessageFromSocket(body);
    if (result?.data?.message?.del_flag === 1) {
    } else {
      if (result?.data?.message?.medthod === 1) {
      } else {
        yield put(
          editMessageAction({
            id: result?.data?.message?.id,
            data: result?.data?.message,
          }),
        );
        const infoEdit = {
          id: result?.data?.message?.id,
          userID: action?.payload?.idUser,
        };
        yield put(getDetailMessageSocketSeenSuccess(infoEdit));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function* getDetailRoomSocket(action: any) {
  try {
    const result: ResponseGenerator = yield detailRoomchat(action?.payload);
    yield put(getDetailRoomSocketSuccess(result?.data?.room));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* getUnreadMessageCountSaga() {
  try {
    const state = store.getState();
    const user_id = state?.auth?.userInfo.id;
    const result: ResponseGenerator = yield getUnreadMessageCountApi(user_id);
    yield put(getUnreadMessageCountSuccess(result?.data));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

// 現在未使用
export function* logMessageSaga(action: any) {
  try {
    const body = {
      current_room_id: action.payload.current_room_id,
      irregular_message_ids: action.payload.irregular_message_ids,
    };
    yield logMessage(body);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function* chatSaga() {
  yield takeEvery(typeChat.GET_ROOM_LIST, getRoomListSaga);
  yield takeEvery(typeChat.GET_DETAIL_LIST_CHAT, getDetailChatSaga);
  yield takeEvery(typeChat.GET_LIST_USER_CHAT, getListUserChatSaga);
  yield takeEvery(typeChat.GET_DETAIL_MESSAGE_SOCKET, getDetailMessageSaga);
  yield takeEvery(
    typeChat.GET_DETAIL_MESSAGE_SOCKET_CURRENT,
    getDetailMessageSagaCurrent,
  );
  yield takeEvery(
    typeChat.FETCH_RESULT_SEARCH_MESSAGE_LIST_FILE,
    fetchResultMessageListFile,
  );
  yield takeEvery(
    typeChat.FETCH_RESULT_SEARCH_MESSAGE_LIST_ROOM,
    fetchResultMessageListRoom,
  );
  yield takeEvery(typeChat.UPDATE_MESSAGE_SEEN, updateMessageSeenSaga);
  yield takeEvery(
    typeChat.GET_DETAIL_MESSAGE_SOCKET_SEEN,
    getDetailMessageSeen,
  );
  yield takeEvery(typeChat.EDIT_MESSAGE_REACTION, editMessageReaction);
  yield takeEvery(typeChat.DETAIL_ROOM_SOCKET, getDetailRoomSocket);
  yield takeEvery(
    typeChat.GET_UNREAD_MESSAGE_COUNT_ALL,
    getUnreadMessageCountSaga,
  );
  yield takeEvery(typeChat.REGISTER_ROOMCHAT, registerRoomChatDevice);
  // deactivate temporally
  // yield takeEvery(typeChat.LOG_MESSAGE, logMessageSaga);
}
