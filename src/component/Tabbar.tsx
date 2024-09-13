import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {ROUTE_NAME} from '../navigation/routeName';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {iconTabChat, iconTabSetting, defaultAvatar, menuPinChat} from '@images';
import {colors, stylesCommon} from '@stylesCommon';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const active_color = colors.activeTab;
const inActive_color = colors.inActiveTab;

type Props = {
  navigation: any;
  state: any;
};

const Tabbar: React.FC<Props> = ({state, navigation}) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const renderLabel = (value: string) => {
    switch (value) {
      case ROUTE_NAME.LISTCHAT_SCREEN:
        return 'チャットグループ';
      case ROUTE_NAME.USER_SCREEN:
        return '個人設定';
      case ROUTE_NAME.BOOKMARK_SCREEN:
        return 'ブックマーク';
      case ROUTE_NAME.SETTING_SCREEN:
        return 'その他';
    }
  };
  const renderIcon = (value: string) => {
    switch (value) {
      case ROUTE_NAME.LISTCHAT_SCREEN:
        return iconTabChat;
      case ROUTE_NAME.SETTING_SCREEN:
        return iconTabSetting;
      case ROUTE_NAME.BOOKMARK_SCREEN:
        return menuPinChat;
    }
  };
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity onPress={onPress} style={styles.button} key={index}>
            {route.name === ROUTE_NAME.USER_SCREEN ? (
              <Image
                source={
                  user?.icon_image ? {uri: user?.icon_image} : defaultAvatar
                }
                style={styles.icon}
              />
            ) : (
              <Image
                source={renderIcon(route.name)}
                style={[
                  {
                    tintColor: isFocused ? active_color : inActive_color,
                  },
                  styles.icon,
                ]}
              />
            )}
            <Text
              style={[
                {
                  color: isFocused ? active_color : inActive_color,
                },
                styles.txtLabel,
              ]}
              numberOfLines={1}>
              {renderLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    paddingTop: verticalScale(12),
    paddingBottom: height >= 812 ? getBottomSpace() + 5 : 12,
    backgroundColor: colors.primary,
  },
  button: {
    width: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(23),
    height: scale(23),
    borderRadius: scale(23) / 2,
  },
  txtLabel: {
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
    marginTop: verticalScale(4),
  },
});

export {Tabbar};
