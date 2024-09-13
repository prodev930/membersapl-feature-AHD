import React, {useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, AppInput, AppButton} from '@component';
import {iconClose} from '@images';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateInfoRoomchat, GlobalService} from '@services';
import {AppSocket} from '@util';
import {useSelector} from 'react-redux';

const EditRoomChat = (props: any) => {
  const navigation = useNavigation<any>();
  const {route} = props;
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const {idRoomChat, dataDetail, type} = route?.params;
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const [name, setName] = useState<any>(dataDetail?.name);
  const [content, setContent] = useState<any>(dataDetail?.summary_column);
  const listUserChat = useSelector((state: any) => state.chat?.listUserChat);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const renderNameRoom = () => {
    if (listUserChat?.length === 1) {
      return null;
    } else {
      return '新規グループ';
    }
  };

  const handleSubmit = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        room_id: idRoomChat,
        description: content,
        name: name ? name : renderNameRoom(),
      };
      await updateInfoRoomchat(body);
      socket.emit('ChatGroup_update_ind2', {
        user_id: user_id,
        room_id: idRoomChat,
        member_info: {
          type: 5,
          ids: listUserChat?.map((e: any) => e.id),
        },
        method: 2,
        room_name: name ? name : renderNameRoom(),
      });
      GlobalService.hideLoading();
      onBack();
    } catch {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={type === 'name' ? 'グループ名' : '概要'}
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
            {type === 'name' && (
              <>
                <Text style={styles.txtTitle}>グループ名</Text>
                <AppInput
                  placeholder="名称"
                  onChange={onChangeName}
                  value={name}
                  maxLength={150}
                />
              </>
            )}
            {type === 'content' && (
              <>
                <Text style={styles.txtTitle}>概要</Text>
                <AppInput
                  placeholder="概要"
                  onChange={onChangeContent}
                  value={content?.replace(/<br\s*[\/]?>/gi, '\n')}
                  multiline={true}
                  styleContainer={styles.multiline}
                  styleInput={styles.multiline}
                />
              </>
            )}
            <AppButton
              title={type === 'name' ? 'グループ名を変更' : '概要を変更'}
              onPress={handleSubmit}
              styleButton={styles.button}
              disabled={dataDetail?.type === 4 || dataDetail?.is_admin !== 1}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export {EditRoomChat};
