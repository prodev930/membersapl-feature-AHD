import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {Header, ModalConfirm, ModalLink} from '@component';
import {
  defaultAvatar,
  iconBell,
  iconCamera,
  iconDelete,
  iconEdit,
  iconDetailRow,
  iconUser,
  iconLogout,
  iconPin,
  iconLink,
  iconDocument,
  iconTaskCutting,
} from '@images';
import {ViewItem} from './components/ViewItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {detailRoomchat, pinFlag, leaveRoomChat, GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import {verticalScale} from 'react-native-size-matters';
import {updateImageRoomChat, deleteImageRoomChat, deleteRoom} from '@services';
import {colors} from '@stylesCommon';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {AppSocket, WEBSOCKET_METHOD_TYPE} from '@util';

type extractUserId = {
  id: number;
};

const InfoRoomChat = (props: any) => {
  const {route} = props;
  const {idRoomChat} = route?.params;
  const listUserChat = useSelector((state: any) => state.chat?.listUserChat);
  const navigation = useNavigation<any>();
  const [dataDetail, setData] = useState<any>(null);
  const [activePin, setActivePin] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLink, setModalLink] = useState(false);
  const [image, setImage] = useState<any>(null);
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const {getSocket} = AppSocket;
  const socket = getSocket();

  const getDetail = useCallback(async () => {
    try {
      GlobalService.showLoading();
      const response = await detailRoomchat(idRoomChat);
      setData(response?.data?.room);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  }, [idRoomChat]);

  const uploadImageApi = useCallback(async () => {
    try {
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? image?.path.replace('file://', '')
            : image?.path,
        type: 'image/jpeg',
        name: image?.filename ? image?.filename : image?.path,
      };
      data.append('file', imageUpload);
      data.append('room_id', idRoomChat);
      const res = await updateImageRoomChat(data);
      await showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      getDetail();
      setImage(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [image, idRoomChat, getDetail]);

  useEffect(() => {
    if (image) {
      uploadImageApi();
    }
  }, [image, uploadImageApi]);

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onCancelModalDelete = useCallback(() => {
    setModalDelete(!modalDelete);
  }, [modalDelete]);

  const onCancelModalLink = useCallback(() => {
    setModalLink(!modalLink);
  }, [modalLink]);

  useFocusEffect(
    useCallback(() => {
      getDetail();
    }, [getDetail]),
  );

  useEffect(() => {
    if (Number(dataDetail?.pin_flag ?? 0) === 1) {
      setActivePin(true);
    } else {
      setActivePin(false);
    }
  }, [dataDetail?.pin_flag]);

  const onPinRoomChat = async () => {
    try {
      GlobalService.showLoading();
      const response = await pinFlag(
        idRoomChat,
        Number(dataDetail?.pin_flag ?? 0) === 1 ? 0 : 1,
      );
      showMessage({
        message: response?.data?.message,
        type: 'success',
      });
      getDetail();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  };

  const onLeave = useCallback(async () => {
    try {
      GlobalService.showLoading();
      onCancelModal();
      const body = {
        room_id: idRoomChat,
      };
      const userIds = listUserChat.map(({id}: extractUserId) => id);
      await leaveRoomChat(body);
      socket.emit('ChatGroup_update_ind2', {
        user_id,
        room_id: idRoomChat,
        task_id: null,
        method: WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_DELETE,
        room_name: null,
        member_info: {
          type: 1,
          ids: userIds,
        },
      });
      navigation.navigate(ROUTE_NAME.LISTCHAT_SCREEN);
      GlobalService.hideLoading();
    } catch {
      GlobalService.hideLoading();
    }
  }, [idRoomChat, navigation, onCancelModal, listUserChat, user_id, socket]);

  const onDelete = useCallback(async () => {
    try {
      GlobalService.showLoading();
      onCancelModalDelete();
      await deleteRoom(idRoomChat);
      socket.emit('ChatGroup_update_ind2', {
        user_id,
        room_id: idRoomChat,
        task_id: null,
        method: WEBSOCKET_METHOD_TYPE.CHAT_ROOM_DELETE,
        room_name: null,
        member_info: null,
      });
      GlobalService.hideLoading();
      navigation.pop(2);
    } catch {
      GlobalService.hideLoading();
    }
  }, [idRoomChat, navigation, onCancelModalDelete, user_id, socket]);

  const upLoadImage = () => {
    ImagePicker.openPicker({
      cropping: false,
      width: verticalScale(126),
      height: verticalScale(126),
    })
      .then(async (imageData: any) => {
        setImage(imageData);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const deleteAvatar = async () => {
    try {
      GlobalService.showLoading();
      const res = await deleteImageRoomChat({
        room_id: idRoomChat,
      });
      await showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      getDetail();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  };

  const renderName = (name: any) => {
    return name;
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          dataDetail?.name && dataDetail?.name?.length > 0
            ? renderName(dataDetail?.name)
            : `${
                dataDetail?.one_one_check &&
                dataDetail?.one_one_check?.length > 0
                  ? dataDetail?.one_one_check[0]?.last_name
                  : ''
              } ${
                dataDetail?.one_one_check &&
                dataDetail?.one_one_check?.length > 0
                  ? dataDetail?.one_one_check[0]?.first_name
                  : ''
              }`
        }
        back
        imageCenter
        mute={dataDetail?.mute_flag === 1 ? true : false}
      />
      <View style={styles.container}>
        {dataDetail ? (
          <ScrollView>
            <View style={styles.viewHeader}>
              <View style={styles.viewAvatar}>
                {dataDetail?.one_one_check?.length > 0 ? (
                  <>
                    {dataDetail?.one_one_check[0]?.icon_image ? (
                      <FastImage
                        source={{
                          uri: dataDetail?.one_one_check[0]?.icon_image,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        style={styles.avatar}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image source={defaultAvatar} style={styles.avatar} />
                    )}
                  </>
                ) : (
                  <>
                    {dataDetail?.icon_image ? (
                      <FastImage
                        source={{
                          uri: dataDetail?.icon_image,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        style={styles.avatar}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image source={defaultAvatar} style={styles.avatar} />
                    )}
                  </>
                )}

                <TouchableOpacity
                  style={styles.pinButton}
                  onPress={onPinRoomChat}>
                  <Image
                    source={iconPin}
                    style={[
                      activePin === false ? styles.inActive : styles.active,
                    ]}
                  />
                </TouchableOpacity>

                {!dataDetail?.one_one_check && dataDetail?.is_admin === 1 ? (
                  <TouchableOpacity
                    style={styles.buttonCamera}
                    onPress={upLoadImage}>
                    <Image source={iconCamera} />
                  </TouchableOpacity>
                ) : null}

                {!dataDetail?.one_one_check && dataDetail?.is_admin === 1 ? (
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={deleteAvatar}>
                    <Image source={iconDelete} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <ViewItem
              sourceImage={iconEdit}
              title="チャットグループ名"
              content={renderName(dataDetail?.name)}
              onClick={() => {
                navigation.navigate(ROUTE_NAME.EDIT_ROOM_CHAT, {
                  idRoomChat: idRoomChat,
                  dataDetail: {
                    ...dataDetail,
                    name: renderName(dataDetail?.name),
                  },
                  type: 'name',
                });
              }}
            />
            <ViewItem
              sourceImage={iconDetailRow}
              title="概要"
              content={dataDetail?.summary_column?.replace(
                /<br\s*[\/]?>/gi,
                '\n',
              )}
              onClick={() => {
                navigation.navigate(ROUTE_NAME.EDIT_ROOM_CHAT, {
                  idRoomChat: idRoomChat,
                  dataDetail: dataDetail,
                  type: 'content',
                });
              }}
            />
            {dataDetail?.type === 4 || dataDetail?.is_admin !== 1 ? null : (
              <ViewItem
                sourceImage={iconLink}
                content="チャット招待リンク"
                onClick={() => {
                  onCancelModalLink();
                }}
              />
            )}
            <ViewItem
              sourceImage={iconDocument}
              content="メディア・ファイル・URL"
              onClick={() => {
                navigation.navigate(ROUTE_NAME.LIST_FILE_IN_ROOM, {
                  idRoom_chat: idRoomChat,
                });
              }}
            />
            <ViewItem
              sourceImage={iconTaskCutting}
              content="タスク"
              onClick={() => {
                navigation.navigate(ROUTE_NAME.TASK_SCREEN, {
                  idRoom_chat: idRoomChat,
                });
              }}
            />
            <ViewItem
              sourceImage={iconBell}
              content="ミュート設定"
              onClick={() => {
                navigation.navigate(ROUTE_NAME.MUTE_SETTING, {
                  roomDetail: dataDetail,
                });
              }}
            />
            {dataDetail?.type === 4 ? null : (
              <ViewItem
                sourceImage={iconUser}
                content="メンバー"
                onClick={() => {
                  navigation.navigate(ROUTE_NAME.LIST_USER, {
                    idRoomChat: idRoomChat,
                    dataDetail: dataDetail,
                    is_admin: dataDetail?.is_admin,
                  });
                }}
              />
            )}
            {dataDetail?.type === 4 ? null : (
              <ViewItem
                sourceImage={iconLogout}
                content="グループを退出"
                isLogout
                hideNext
                onClick={onCancelModal}
              />
            )}
            {dataDetail?.is_admin === 1 && listUserChat?.length > 1 ? (
              <ViewItem
                sourceImage={iconDelete}
                content="グループを削除"
                hideNext
                isLogout
                hideBorder
                onClick={onCancelModalDelete}
              />
            ) : null}
          </ScrollView>
        ) : (
          <View style={styles.marginTop}>
            <ActivityIndicator size="small" color={colors.border} />
          </View>
        )}
      </View>
      <ModalConfirm
        visible={modal}
        onCancel={onCancelModal}
        titleHeader="グループを退出する"
        contentHeader="退出すると新しいメッセージが届かなくなります。"
        onConfirm={onLeave}
      />
      <ModalLink
        visible={modalLink}
        onCancel={onCancelModalLink}
        titleHeader="チャット招待リンク"
        idRoomChat={idRoomChat}
      />
      <ModalConfirm
        visible={modalDelete}
        onCancel={onCancelModalDelete}
        titleHeader="このグループを削除しますか?"
        onConfirm={onDelete}
      />
    </View>
  );
};

export {InfoRoomChat};
