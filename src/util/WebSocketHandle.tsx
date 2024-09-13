import {io} from 'socket.io-client';
import {
  getRoomList,
  getDetailMessageSocket,
  getDetailMessageSocketCurrent,
  getDetailMessageSocketSeen,
  updateMessageReaction,
  saveIsGetInfoRoom,
  registerRoomChat,
  updateRoomList,
} from '@redux';
import {store} from '../redux/store';
import {
  SOCKETIO_DOMAIN,
  EVENT_SOCKET,
  WEBSOCKET_METHOD_TYPE,
} from './constanString';

export const socketURL = `https://${SOCKETIO_DOMAIN}:443`;

let socketIO = io('', {
  autoConnect: false,
});

function createAppSocket() {
  const init = (token?: string) => {
    let SOCKET_CONFIG = {
      autoConnect: false,
      auth: {
        token: token || store.getState()?.auth?.userInfo?.ws_token,
      },
    };
    socketIO = io(socketURL, SOCKET_CONFIG);
    socketIO.connect();
    onHandleEvent(socketIO);
  };

  const onHandleEvent = (socket: any) => {
    socket.on(EVENT_SOCKET.CONNECT, () => {});

    // 誰かがメッセージ送信&socketサーバに送信(NEW_MESSAGE_IND)->ここで受信
    // ルームリストの更新
    // socket.on(EVENT_SOCKET.NEW_MESSAGE_IND, (data: any) => {
    //   console.log(EVENT_SOCKET.NEW_MESSAGE_IND, data);
    //   const state = store.getState();
    //   if (data?.room_id === state?.chat?.id_roomChat) {
    //     return;
    //   }
    //   if (state?.chat?.roomList?.length > 0) {
    //     const index = state.chat.roomList.findIndex(
    //       (element: any) => element?.id === data?.room_id,
    //     );
    //     if (index > -1) {
    //       store.dispatch(
    //         getRoomList({
    //           company_id: state?.chat?.idCompany,
    //           search: null,
    //           type: state?.chat?.type_Filter,
    //           category_id: state?.chat?.categoryID_Filter,
    //         }),
    //       );
    //     }
    //   }
    // });

    // 誰かがメッセージ送信&socketサーバに送信(MESSAGE_IND)->ここで受信
    // ルーム詳細の更新
    // socket.on(EVENT_SOCKET.MESSAGE_IND, (data: any) => {
    //   console.log(EVENT_SOCKET.MESSAGE_IND, data);
    //   const state = store.getState();
    //   if (
    //     data?.user_id !== state?.auth?.userInfo?.id &&
    //     data?.room_id === state?.chat?.id_roomChat
    //   ) {
    //     if (data?.message_type === 3) {
    //       const value = {
    //         id_message: data?.relation_message_id,
    //         message_type: data?.message_type,
    //       };
    //       store.dispatch(updateMessageReaction(value));
    //     } else {
    //       const value = {
    //         id_message: data?.message_id,
    //         message_type: data?.message_type,
    //       };
    //       store.dispatch(getDetailMessageSocket(value));
    //     }
    //   } else {
    //     if (data?.room_id === state?.chat?.id_roomChat) {
    //       store.dispatch(
    //         getDetailMessageSocket({
    //           id_message: data?.message_id,
    //           message_type: data?.message_type,
    //         }),
    //       );
    //     }
    //     if (data?.message_type === 3) {
    //       const value = {
    //         id_message: data?.relation_message_id,
    //         message_type: data?.message_type,
    //       };
    //       store.dispatch(getDetailMessageSocketCurrent(value));
    //     } else {
    //       const value = {
    //         id_message: data?.message_id,
    //         message_type: data?.message_type,
    //       };
    //       store.dispatch(getDetailMessageSocketCurrent(value));
    //     }
    //   }
    // });

    // socket.on(EVENT_SOCKET.CHAT_GROUP_UPDATE_IND, (data: any) => {
    //   console.log(EVENT_SOCKET.CHAT_GROUP_UPDATE_IND, data);
    //   const state = store.getState();
    //   if (data?.room_id === state?.chat?.id_roomChat) {
    //     store.dispatch(saveIsGetInfoRoom(true));
    //   } else {
    //     // リストチャット状態の処理
    //     if (
    //       data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_ADD ||
    //       data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_EDIT
    //     ) {
    //       // 追加処理の場合
    //       // method 11はwebで新規作成
    //       // method 2はアプリで新規作成
    //       // member_info.idsに自身のidが含まれている場合にreloadを行う
    //       if (
    //         data?.member_info?.ids?.findIndex(
    //           (userId: number) => userId === state?.auth?.userInfo?.id,
    //         ) > -1
    //       ) {
    //         store.dispatch(
    //           getRoomList({
    //             company_id: state?.chat?.idCompany,
    //             search: null,
    //             type: state?.chat?.type_Filter,
    //             category_id: state?.chat?.categoryID_Filter,
    //           }),
    //         );
    //       }
    //     } else if (
    //       data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_DELETE ||
    //       data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_DELETE
    //     ) {
    //       // メンバー追加・削除、ルーム削除の場合
    //       // 既存のリストに対象となるルームIDが存在する場合reloadを行う
    //       if (
    //         state?.chat?.roomList?.findIndex(
    //           (el: any) => el.id === data?.room_id,
    //         ) > -1
    //       ) {
    //         store.dispatch(
    //           getRoomList({
    //             company_id: state?.chat?.idCompany,
    //             search: null,
    //             type: state?.chat?.type_Filter,
    //             category_id: state?.chat?.categoryID_Filter,
    //           }),
    //         );
    //       }
    //     }
    //   }

    //   // アプリ用の通知対象デバイスとしての登録処理
    //   // サーバサイドにAPIリクエストを送りpush通知を送付するデバイスとして登録させる
    //   // ルーム新規作成、メンバー追加の時に発火
    //   // 但し自分のみ追加の場合は、Web版の場合メッセージが追加されないこと、
    //   // 未読状態を連携しなくても良いので除外（投稿した瞬間必ず既読になるため）
    //   if (
    //     // アプリ版の条件
    //     (data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_EDIT &&
    //       (data?.member_info?.ids.findIndex(
    //         (userId: number) => userId === state?.auth?.userInfo?.id,
    //       ) > -1 ||
    //         data?.user_id === state?.auth?.userInfo?.id)) ||
    //     // web版の条件
    //     (data?.method === WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_ADD &&
    //       data?.member_info?.ids?.length > 1 &&
    //       data?.member_info?.ids?.findIndex(
    //         (userId: number) => userId === state?.auth?.userInfo?.id,
    //       ) > -1)
    //   ) {
    //     if (
    //       state?.chat?.roomList?.findIndex(
    //         (el: any) => el.id === data?.room_id,
    //       ) === -1
    //     ) {
    //       store.dispatch(
    //         registerRoomChat({
    //           connect_room_id: data?.room_id,
    //         }),
    //       );
    //     }
    //   }
    // });

    // socket.on(EVENT_SOCKET.NEW_MESSAGE_CONF, async (data: any) => {
    //   console.log(EVENT_SOCKET.NEW_MESSAGE_CONF, data);
    //   const state = store.getState();
    //   if (data?.user_id !== state?.auth?.userInfo?.id) {
    //     if (data?.room_id === state?.chat?.id_roomChat) {
    //       const body = {
    //         idMsg: data?.message_id,
    //         idUser: data?.user_id,
    //       };
    //       store.dispatch(getDetailMessageSocketSeen(body));
    //     } else if (state.chat.roomList.length > 0) {
    //       store.dispatch(updateRoomList({room_id: data.room_id}));
    //     }
    //   }
    // });

    // //AHD-11819用修正。
    // //web側から詳細チャットを開いた段階でアプリ側に送信されるのがこれのみのため、暫定的にルームの既読状態を検知するために使用。
    // socket.on(EVENT_SOCKET.CHANGE_BROWSER_ICON, (data: any) => {
    //   console.log(EVENT_SOCKET.CHANGE_BROWSER_ICON, data);
    //   const state = store.getState();

    //   if (
    //     data.user_id === state.auth.userInfo.id &&
    //     state.chat.roomList.length > 0
    //   ) {
    //     store.dispatch(
    //       updateRoomList({
    //         room_id: data.room_id,
    //         unread_count: data.unread_count,
    //       }),
    //     );
    //   }
    // });

    socket.on(EVENT_SOCKET.DISCONNECT, () => {});
  };

  const endConnect = () => {
    socketIO.disconnect();
  };

  const getSocket = () => {
    return socketIO;
  };

  return {
    init,
    endConnect,
    getSocket,
    onHandleEvent,
  };
}

export const AppSocket = createAppSocket();
