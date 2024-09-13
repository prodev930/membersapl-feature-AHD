import React, {forwardRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {API_DOMAIN, AppSocket} from '@util';

import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';
import {useSelector} from 'react-redux';
import StackTab from './StackTab';

const {init, endConnect} = AppSocket;

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    [ROUTE_NAME.DETAIL_CHAT]: {
      path: 'chat/:idRoomChat',
      parse: {
        idRoomChat: Number,
        messId: (messId?: string) => messId && parseInt(messId, 10),
      },
    },
    [ROUTE_NAME.LOGIN]: '*',
  },
};

const linking = {
  // TODO 一旦本番ドメイン固定とするのでstage向けも個別にできるようになったらAPI_DOMAIN利用にする
  prefixes: ['mem-bers://', 'https://mem-bers.jp'],
  config,
};

//Vì dự án bị thay đổi requirement khá nhiều ở luồng app nên file navigation đang phải để tạm thế này, sau này ai rảnh thì sửa lại nhé

const NavigationApp = forwardRef((props: any, ref: any) => {
  const screenOptions = {
    headerShown: false,
  };
  const wsToken = useSelector((state: any) => state?.auth?.userInfo?.ws_token);

  useEffect(() => {
    if (wsToken) {
      init(wsToken);
      return () => {
        endConnect();
      };
    }
  }, [wsToken]);

  const renderStackApp = () => {
    return (
      <>
        <Stack.Screen
          name={ROUTE_NAME.LOGIN}
          component={screens.Login}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={ROUTE_NAME.FORGOT_PASSWORD}
          component={screens.ForgotPassword}
        />
        <Stack.Screen
          name={ROUTE_NAME.NETWORK_ERR}
          component={screens.NetworkErr}
        />
        <Stack.Screen
          name={ROUTE_NAME.SELECT_COMPANY}
          component={screens.SelectCompany}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={ROUTE_NAME.TAB_SCREEN}
          component={StackTab}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={ROUTE_NAME.CREATE_ROOM_CHAT}
          component={screens.CreateRoomChat}
        />
        <Stack.Screen
          name={ROUTE_NAME.DETAIL_CHAT}
          component={screens.DetailChat}
        />
        <Stack.Screen
          name={ROUTE_NAME.INFO_ROOM_CHAT}
          component={screens.InfoRoomChat}
        />
        <Stack.Screen
          name={ROUTE_NAME.LIST_USER}
          component={screens.ListUser}
        />
        <Stack.Screen
          name={ROUTE_NAME.EDIT_ROOM_CHAT}
          component={screens.EditRoomChat}
        />
        <Stack.Screen
          name={ROUTE_NAME.EDIT_USER}
          component={screens.EditUser}
        />
        <Stack.Screen
          name={ROUTE_NAME.CHANGE_PASSWORD}
          component={screens.ChangePassword}
        />
        <Stack.Screen
          name={ROUTE_NAME.CONFIG_NOTI}
          component={screens.ConfigNoti}
        />
        <Stack.Screen
          name={ROUTE_NAME.LIST_REACTION}
          component={screens.ListReaction}
        />
        <Stack.Screen
          name={ROUTE_NAME.SEARCH_MESSAGE}
          component={screens.SearchMessage}
        />
        <Stack.Screen
          name={ROUTE_NAME.USER_SEEN}
          component={screens.UserSeen}
        />
        <Stack.Screen
          name={ROUTE_NAME.SETTING_COMPANY}
          component={screens.SettingCompany}
        />
        <Stack.Screen
          name={ROUTE_NAME.DETAIL_VIDEO}
          component={screens.DetailVideo}
        />
        <Stack.Screen
          name={ROUTE_NAME.LIST_FILE_IN_ROOM}
          component={screens.ListFileInRoom}
        />
        <Stack.Screen
          name={ROUTE_NAME.ADD_GROUP_FILTER_CHAT}
          component={screens.AddGroupFilterChat}
        />
        <Stack.Screen name={ROUTE_NAME.TASK_SCREEN} component={screens.Task} />
        <Stack.Screen
          name={ROUTE_NAME.MUTE_SETTING}
          component={screens.MuteSetting}
        />
      </>
    );
  };
  return (
    <NavigationContainer ref={ref} linking={linking}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={ROUTE_NAME.SPLASH_SCREEN}
          component={screens.Splash}
        />
        {renderStackApp()}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default NavigationApp;
