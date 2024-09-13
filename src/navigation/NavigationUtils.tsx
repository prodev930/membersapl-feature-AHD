import {
  CommonActions,
  StackActions,
  type NavigatorScreenParams,
} from '@react-navigation/native';

export type BottomTabParamList = {
  LISTCHAT_SCREEN: {
    idRoomChat: string;
  };
  USER_SCREEN: undefined;
  BOOKMARK_SCREEN: undefined;
  SETTING_SCREEN: undefined;
};

export type MainStackParamList = {
  LOGIN: undefined;
  FORGOT_PASSWORD: undefined;
  NETWORK_ERR: {
    message: string;
  };
  SELECT_COMPANY: undefined;
  TAB_SCREEN: NavigatorScreenParams<BottomTabParamList>;
  CREATE_ROOM_CHAT: {
    typeScreen: 'CREATE' | 'ADD_NEW_USER';
    idRoomchat: string;
  };
  DETAIL_CHAT: {
    idRoomChat: number;
    idMessageSearchListChat?: number;
    messId?: string;
  };
  INFO_ROOM_CHAT: {
    idRoomChat: string;
  };
  LIST_USER: {
    idRoomChat: string;
    is_admin: number;
  };
  EDIT_ROOM_CHAT: {
    idRoomChat: string;
    dataDetail: {
      is_admin: number;
      name: string[];
      one_one_check: {
        last_name: string;
        first_name: string;
        icon_image: string;
      }[];
      icon_image: string;
      summary_column: string;
    };
    type: number;
    pin_flag: number;
  };
  EDIT_USER: {
    type: 'Email' | 'Name';
  };
  CHANGE_PASSWORD: undefined;
  CONFIG_NOTI: undefined;
  LIST_REACTION: {
    id: string;
    room_id: string;
  };
  SEARCH_MESSAGE: {
    idRoomChat: string;
  };
  USER_SEEN: {
    id: string;
  };
  SETTING_COMPANY: undefined;
  DETAIL_VIDEO: {
    url: string;
  };
  LIST_FILE_IN_ROOM: {
    idRoom_chat: string;
  };
  ADD_GROUP_FILTER_CHAT: {
    id: string;
  };
  TASK_SCREEN: {
    idRoom_chat: string;
  };
  MUTE_SETTING: {
    roomDetail: {
      mute_flag: number;
      id: string;
    };
  };
};

let _navigator: any; // eslint-disable-line

export function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

export function navigate(routeName: any, params?: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export function goBack() {
  if (_navigator.canGoBack()) {
    _navigator.dispatch(CommonActions.goBack());
  }
}

function pop(value: any) {
  _navigator.dispatch(StackActions.pop(value));
}

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
};
