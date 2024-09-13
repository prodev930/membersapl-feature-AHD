import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';
import {Platform} from 'react-native';
import {getSystemVersion} from 'react-native-device-info';
import {registerToken} from '@services';
import {store} from '../redux/store';
import {convertString} from './function';
import notifee, {EventType} from '@notifee/react-native';
import {
  getRoomList,
  saveIdRoomChat,
  getDetailRoomSocket,
  resetDataChat,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {NavigationUtils} from '@navigation';

function createAppNotification() {
  let fcmToken = '';
  let lastMessageId = '';

  const initFB = () => {
    requestUserPermisstion();
    messaging().onTokenRefresh((newFcmToken: string) => {
      saveDeviceToken(newFcmToken);
    });

    messaging()
      .getInitialNotification()
      .then(async notification => {
        if (!notification) {
          return;
        }
        if (notification.messageId !== lastMessageId) {
          lastMessageId = notification.messageId || '';
        }
        handleUserInteractionNotification(notification);
      })
      .catch(error => {
        throw error;
      });

    messaging().onMessage(async notification => {
      // 該当のルームを開いていない場合は通知を表示
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
        // iOS用のバッチ表示
        let BadgeCount = 1;
        // iOSバッチ表示は PHP側で件数を指定される
        if (
          notification.data &&
          notification.data.badge_update_numflag === '1'
        ) {
          // badge_update_numflagがある場合は受け取った件数を表示
          BadgeCount = Number(notification.data.badgeCount);
          await notifee.setBadgeCount(BadgeCount);
        } else {
          // badge_update_numflagなしの通知を受け取ったらiOSバッチ表示は+1
          await notifee.incrementBadgeCount();
        }

        handleNotiOnForeground(notification);
      }
    });

    messaging().onNotificationOpenedApp(async notification => {
      //
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
      }
      await notifee.decrementBadgeCount();
      handleUserInteractionNotification(notification);
    });

    // バックグラウンド時に通知を受け取った場合の処理
    // バッチの更新とルームごとの未読件数の更新を実施
    messaging().setBackgroundMessageHandler(async notification => {
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
      }
      // iOS用のバッチ表示
      let BadgeCount = 1;
      // バックグラウンド時になったらiOSバッチ表示は PHP側で件数を指定される
      if (notification.data && notification.data.badge_update_numflag === '1') {
        // badge_update_numflagがある場合は受け取った件数を表示
        BadgeCount = Number(notification.data.badgeCount);
        await notifee.setBadgeCount(BadgeCount);
      } else {
        // badge_update_numflagなしの通知を受け取ったらiOSバッチ表示は+1
        await notifee.incrementBadgeCount();
      }

      // roomidの指定があれば更新をする
      const state = store.getState();
      if (notification.data?.room_id === state?.chat?.id_roomChat) {
        return null;
      } else {
        if (state?.chat?.roomList?.length > 0) {
          const dataList = [...state?.chat?.roomList];
          const index = dataList.findIndex(
            (element: any) => element?.id === notification.data?.room_id,
          );
          console.log(index);
          if (index > -1) {
            store.dispatch(getDetailRoomSocket(notification.data?.room_id));
          }
        }
      }
    });
  };

  notifee.onBackgroundEvent(async ({type, detail}: any) => {
    const {notification, pressAction} = detail;
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
      await notifee.decrementBadgeCount();
      await notifee.cancelNotification(notification?.id);
    }
  });

  const requestUserPermisstion = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const newFcmToken = await messaging().getToken();
      fcmToken = newFcmToken;
      saveDeviceToken(newFcmToken);
    }
  };

  const handleNotiOnForeground = async (message: any) => {
    const {notification} = message;
    let title = '';
    let bodyMessage = '';
    const state = store.getState();
    try {
      title = notification.title;
      bodyMessage = notification.body;
      if (!!title || !!bodyMessage) {
        showMessage({
          backgroundColor: 'rgba(139, 194, 39, 0.8)',
          duration: 5000,
          message: title,
          description: convertString(bodyMessage),
          color: '#FFFFFF',
          //@ts-ignore
          onPress: () => {
            handleUserInteractionNotification(message);
          },
        });
        // update list chat unread message count
        store.dispatch(
          getRoomList({
            key: null,
            company_id: state.chat.idCompany,
            page: 1,
            type: state.chat.type_Filter,
            category_id: state.chat.categoryID_Filter,
          }),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleUserInteractionNotification = async (message: any) => {
    const {data} = message;
    try {
      if (data?.room_id) {
        const state = store.getState();
        if (data.room_id !== state?.chat?.id_roomChat) {
          await store.dispatch(resetDataChat());
        }
        await store.dispatch(saveIdRoomChat(data.room_id));
        NavigationUtils.navigate(ROUTE_NAME.DETAIL_CHAT, {
          idRoomChat: data.room_id,
          idMessageSearchListChat: null,
        });
      }
    } catch (error) {}
  };

  const saveDeviceToken = async (newFcmToken: string) => {
    try {
      const data = {
        token: newFcmToken,
        os_version: getSystemVersion(),
        os_name: Platform.OS,
      };
      await registerToken(data);
    } catch (error) {}
  };

  const removeBadge = () => {
    notifee.setBadgeCount(0);
  };

  return {
    requestUserPermisstion,
    fcmToken,
    initFB,
    removeBadge,
  };
}

export const AppNotification = createAppNotification();
