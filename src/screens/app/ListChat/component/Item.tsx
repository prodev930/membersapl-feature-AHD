import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import {
  defaultAvatar,
  iconPin,
  iconFile,
  iconPdf,
  iconDoc,
  iconXls,
  iconBellSlash,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import FastImage from 'react-native-fast-image';
import {convertString, HITSLOP, AppSocket} from '@util';
import {pinFlag, GlobalService} from '@services';

import {saveIdRoomChat, getRoomList, resetDataChat} from '@redux';
import {showMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
import {decode} from 'html-entities';
import notifee from '@notifee/react-native';

const Item = React.memo(({item}: any) => {
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const user = useSelector((state: any) => state.auth.userInfo);
  const dispatch = useDispatch();
  const type_Filter = useSelector((state: any) => state.chat.type_Filter);
  const categoryID_Filter = useSelector(
    (state: any) => state.chat.categoryID_Filter,
  );
  const navigation = useNavigation<any>();
  const pin = Number(item?.pin_flag);
  const listRoom = useSelector((state: any) => state.chat.roomList);
  const socket = AppSocket.getSocket();

  useEffect(() => {
    const roomArray = listRoom?.filter((room: any) => room.id === item.id);
    if (roomArray.length > 0) {
      item.message_unread = roomArray[0].message_unread;
    }
  }, [listRoom, item]);

  const renderNameRoom = (name: any) => {
    return name;
  };

  const navigateDetail = () => {
    try {
      dispatch(resetDataChat());

      const sockBody = {
        user_id: user.id,
        change_flag: 0,
        unread_count: 0,
        unread_mention: 0,
        room_id: item.id,
      };
      listRoom.forEach((room: any) => {
        if (room.id !== item.id) {
          if (room.message_unread) {
            sockBody.unread_count++;
          }
          if (room.message_mention_unread) {
            sockBody.unread_mention++;
          }
        }
      });
      // change_flag: 0 => ブラウザアイコンを未読なしにする、1 => ブラウザアイコンを未読ありにする
      sockBody.change_flag = sockBody.unread_count > 0 ? 1 : 0;
      socket.emit('change_browser_icon2', sockBody);

      notifee.getBadgeCount().then(async (count: any) => {
        if (count > 0 && item.message_unread > 0) {
          const countMessage =
            count - item.message_unread > 0 ? count - item.message_unread : 0;
          notifee.setBadgeCount(countMessage);
        }
        await dispatch(saveIdRoomChat(item?.id));
        navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {
          idRoomChat: item?.id,
          idMessageSearchListChat: null,
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const renderImgaeFile = useCallback((typeFile: any) => {
    switch (typeFile) {
      case '2':
        return iconPdf;
      case '5':
        return iconDoc;
      case '3':
        return iconXls;
      default:
        return iconFile;
    }
  }, []);

  const onPinRoomChat = async () => {
    try {
      GlobalService.showLoading();
      const response = await pinFlag(item?.id, !pin ? 1 : 0);
      showMessage({
        message: response?.data?.message,
        type: 'success',
      });
      await dispatch(
        getRoomList({
          key: '',
          company_id: idCompany,
          page: 1,
          type: type_Filter,
          category_id: categoryID_Filter,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  };

  const unreadMessageCount =
    item?.mute_flag === 1
      ? item?.message_mention_unread_count
      : item?.message_unread;

  return (
    <TouchableOpacity style={styles.container} onPress={navigateDetail}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          {item?.one_one_check?.length > 0 ? (
            <View style={styles.image}>
              <FastImage
                style={styles.image}
                source={
                  item?.one_one_check?.length > 0 &&
                  item?.one_one_check[0]?.icon_image
                    ? {
                        uri: item?.one_one_check[0]?.icon_image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }
                    : defaultAvatar
                }
              />
              {item?.online_status === true ? (
                <View style={styles.viewActive}>
                  <View style={styles.active} />
                </View>
              ) : null}
            </View>
          ) : (
            <View style={styles.image}>
              <FastImage
                style={styles.image}
                source={
                  item?.icon_image
                    ? {
                        uri: item?.icon_image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }
                    : defaultAvatar
                }
              />
              {item?.online_status === true ? (
                <View style={styles.viewActive}>
                  <View style={styles.active} />
                </View>
              ) : null}
            </View>
          )}
        </View>
        <View style={styles.viewTxt}>
          <>
            <View style={styles.viewRowTitle}>
              <Text
                style={[
                  styles.txtContent,
                  {
                    fontWeight: unreadMessageCount > 0 ? 'bold' : '600',
                    color:
                      unreadMessageCount > 0
                        ? colors.black
                        : colors.backgroundTab,
                  },
                ]}
                numberOfLines={1}>
                {item?.name && item?.name?.length > 0
                  ? renderNameRoom(item?.name)
                  : `${
                      item?.one_one_check
                        ? item?.one_one_check[0]?.last_name
                        : ''
                    } ${
                      item?.one_one_check
                        ? item?.one_one_check[0]?.first_name
                        : ''
                    }`}
              </Text>
            </View>
            {item?.lastMessageJoin?.attachment_files?.length > 0 ? (
              <View style={styles.viewRow}>
                {item?.lastMessageJoin?.attachment_files?.map((el: any) => (
                  <View key={el?.id}>
                    {el?.type == 4 ? (
                      <FastImage
                        source={{
                          uri: el?.path,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        style={styles.imageSmall}
                      />
                    ) : (
                      <Image
                        source={renderImgaeFile(el?.type)}
                        style={styles.imageFile}
                      />
                    )}
                  </View>
                ))}
              </View>
            ) : null}
            {item?.lastMessageJoin?.message &&
            item?.lastMessageJoin?.message !== 'null' ? (
              <Text style={styles.txtTitle} numberOfLines={2}>
                {item?.lastMessageJoin?.msg_type === 9
                  ? 'ゲストが参加しました。'
                  : item?.lastMessageJoin?.msg_type === 14
                  ? item?.lastMessageJoin.task_message
                  : convertString(
                      decode(
                        item?.lastMessageJoin?.message
                          ?.split(/<br>|<br\/>/)
                          .join('\n'),
                      ),
                    )}
              </Text>
            ) : null}
          </>
        </View>
        <View style={styles.viewImageNext}>
          {item?.mute_flag === 1 ? (
            <Image style={styles.viewBellSlash} source={iconBellSlash} />
          ) : (
            <View style={styles.viewBellSlash} />
          )}

          <TouchableOpacity hitSlop={HITSLOP} onPress={onPinRoomChat}>
            <Image
              source={iconPin}
              style={{
                tintColor: pin === 1 ? colors.secondPrimary : colors.border,
              }}
            />
          </TouchableOpacity>

          <View
            style={
              unreadMessageCount > 0 ? styles.viewUnread : styles.viewDefault
            }>
            {unreadMessageCount > 0 && (
              <Text style={styles.txtMessageUnread} numberOfLines={1}>
                {unreadMessageCount > 9 ? '9+' : unreadMessageCount}
              </Text>
            )}

            {item?.message_mention_unread === true && (
              <View style={styles.viewActiveTag} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: scale(2),
  },
  viewContent: {
    paddingBottom: verticalScale(12),
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '17%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '61%',
    justifyContent: 'center',
  },
  viewImageNext: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.border,
    marginTop: scale(5),
  },
  txtContent: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
  image: {
    width: moderateScale(51),
    height: moderateScale(51),
    borderRadius: moderateScale(51) / 2,
  },
  viewActive: {
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(14 / 2),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  active: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12 / 2),
    backgroundColor: colors.active,
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  viewRowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '95%',
  },
  imageSmall: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  viewBellSlash: {
    width: moderateScale(15),
    height: moderateScale(12),
  },
  viewDefault: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  viewUnread: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(25 / 2),
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMessageUnread: {
    fontSize: moderateScale(10),
    ...stylesCommon.fontWeight600,
    color: '#FFFFFF',
  },
  viewActiveTag: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: colors.primary,
    top: -2,
    right: -2,
  },
});

export {Item};
