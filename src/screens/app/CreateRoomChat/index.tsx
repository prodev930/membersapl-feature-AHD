import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {Header, AppInput, AppButton} from '@component';
import {iconClose} from '@images';
import {colors} from '@stylesCommon';
import {debounce} from 'lodash';
import {AppSocket, WEBSOCKET_METHOD_TYPE} from '@util';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getDetailMessageSocketSuccess} from '@redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getListUser, createRoom, GlobalService, inviteMember} from '@services';

const CreateRoomChat = (props: any) => {
  const {route} = props;
  const dispatch = useDispatch();
  const {typeScreen, idRoomchat} = route?.params;
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const navigation = useNavigation<any>();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [name, setName] = useState<any>(null);
  const [listUser, setListUser] = useState<any[]>([]);
  const [resultUser, setResultUser] = useState<any[]>([]);
  const [key, setKey] = useState<any>(null);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onChange = useCallback((value: string) => {
    setName(value);
  }, []);

  const onSearch = useCallback(async (keySearch: string) => {
    try {
      GlobalService.showLoading();
      if (keySearch?.length > 0) {
        const result = await getListUser({name: keySearch});
        setResultUser(result?.data?.users?.data ?? []);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  }, []);

  const debounceText = useCallback(
    debounce(text => {
      onSearch(text);
    }, 500),
    [onSearch],
  );

  const onSearchName = useCallback(
    (value: string) => {
      setKey(value);
      debounceText(value);
    },
    [debounceText],
  );

  const onAddUser = useCallback((item: any) => {
    setListUser(prev => prev.concat([item]));
    setResultUser([]);
    setKey(null);
  }, []);

  const onDeleteItem = useCallback((item: any) => {
    setListUser(prev => prev.filter(element => element?.id !== item?.id));
  }, []);

  const renderIdUser = useCallback(() => {
    const data: number[] = [];
    listUser.forEach(user => {
      data.push(user.id);
    });
    return data;
  }, [listUser]);

  const renderNameRoom = useCallback(() => {
    if (renderIdUser().length === 1) {
      return null;
    } else {
      let dataName = '';
      listUser.forEach((item: any) => {
        dataName = `${dataName}${item?.last_name}${item?.first_name}、`;
      });
      return `${dataName.replace(/.$/, '')}、${user?.last_name}${
        user?.first_name
      }`;
    }
  }, [listUser, renderIdUser, user]);

  const handleSubmit = useCallback(async () => {
    if (typeScreen === 'CREATE') {
      try {
        GlobalService.showLoading();
        const ids = renderIdUser();
        const body = {
          name: name ?? renderNameRoom(),
          user_id: ids,
        };
        const result = await createRoom(body);
        socket.emit('ChatGroup_update_ind2', {
          user_id,
          room_id: result?.data?.data?.id,
          member_info: {
            type: 1,
            ids,
          },
          method: WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_ADD,
          room_name: name ?? renderNameRoom(),
        });
        navigation.goBack();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        GlobalService.hideLoading();
      }
    } else {
      try {
        GlobalService.showLoading();
        const body = {
          room_id: idRoomchat,
          user_id: renderIdUser(),
        };
        const result = await inviteMember(body);
        socket.emit('message_ind2', {
          user_id,
          room_id: idRoomchat,
          task_id: null,
          to_info: null,
          level: result?.data?.data?.msg_level,
          message_id: result?.data?.data?.id,
          message_type: result?.data?.data?.msg_type,
          method: result?.data?.data?.method,
          // attachment_files: res?.data?.attachmentFiles,
          stamp_no: result?.data?.data?.stamp_no,
          relation_message_id: result?.data?.data?.reply_to_message_id,
          text: result?.data?.data?.message,
          text2: null,
          time: result?.data?.data?.created_at,
        });
        socket.emit('ChatGroup_update_ind2', {
          user_id,
          room_id: idRoomchat,
          member_info: {
            type: 1,
            ids: renderIdUser(),
          },
          method: WEBSOCKET_METHOD_TYPE.CHAT_ROOM_MEMBER_ADD,
        });
        dispatch(getDetailMessageSocketSuccess([result?.data?.data]));
        navigation.goBack();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        GlobalService.hideLoading();
      }
    }
  }, [
    dispatch,
    idRoomchat,
    name,
    navigation,
    renderIdUser,
    renderNameRoom,
    socket,
    typeScreen,
    user_id,
  ]);

  const validateDisabled = () => {
    if (typeScreen !== 'CREATE') {
      return false;
    }
  };

  const renderPlaceHolder = () => {
    if (typeScreen === 'CREATE') {
      return 'メンバー検索';
    } else {
      return '名前';
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={typeScreen === 'CREATE' ? '新規グループ' : 'メンバー追加'}
        imageCenter
        iconRightFirst={iconClose}
        onRightFirst={onBack}
      />
      <View style={styles.viewContent}>
        <View style={styles.linearGradient}>
          <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            style={styles.viewForm}
            showsVerticalScrollIndicator={false}>
            {typeScreen === 'CREATE' && (
              <AppInput
                placeholder="グループ名"
                onChange={onChange}
                value={name}
                maxLength={150}
              />
            )}
            <View style={styles.viewSelectUser}>
              {listUser.length > 0 && (
                <View style={styles.viewRow}>
                  {listUser.map((item: any, index: any) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.viewTxtArray}
                        onPress={() => onDeleteItem(item)}>
                        <Text style={styles.txtArray}>
                          {item?.last_name}
                          {item?.first_name}
                        </Text>
                        <Image source={iconClose} style={styles.iconClose} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <TextInput
                style={styles.input}
                onChangeText={onSearchName}
                value={key}
                placeholder={listUser.length > 0 ? '' : renderPlaceHolder()}
                placeholderTextColor={colors.placeholder}
                onSubmitEditing={() => onSearch(key)}
                returnKeyType="search"
              />
            </View>
            <ScrollView style={styles.viewResultSearch}>
              {resultUser.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.viewItemResultUser}
                    onPress={() => onAddUser(item)}>
                    <Text>
                      {item?.last_name} {item?.first_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <AppButton
              title={
                typeScreen === 'CREATE' ? 'グループを追加' : 'メンバーを追加'
              }
              onPress={handleSubmit}
              styleButton={styles.button}
              disabled={validateDisabled()}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export {CreateRoomChat};
