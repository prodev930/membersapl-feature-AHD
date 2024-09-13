import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {Header} from '@component';
import {
  like,
  happy,
  heart,
  great,
  smile,
  sad,
  defaultAvatar,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  understand,
  bow,
  congrats,
} from '@images';

import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {getListReactionApi, GlobalService, removeReactionApi} from '@services';
import {editMessageAction} from '@redux';
import {AppSocket} from '@util';

const ListReaction = (props: any) => {
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const {route} = props;
  const {id, room_id} = route?.params;
  const dispatch = useDispatch();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const [dataList, setData] = useState<any>([]);

  const getListReaction = async () => {
    try {
      GlobalService.showLoading();
      const res = await getListReactionApi(id);
      setData(res?.data?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    getListReaction();
  }, []);

  const renderIcon = useCallback((id: number) => {
    switch (id) {
      case 1:
        return icon1;
      case 2:
        return icon2;
      case 3:
        return icon3;
      case 4:
        return icon4;
      case 5:
        return icon5;
      case 6:
        return icon6;
      case 7:
        return understand;
      case 8:
        return bow;
      case 9:
        return congrats;
    }
  }, []);

  const renderStyleIcon = useCallback((id: number) => {
    switch (id) {
      case 1:
        return styles.imageIconHeart;
      case 2:
        return styles.imageIcon;
      case 3:
        return styles.imageIcon;
      case 4:
        return styles.imageIcon;
      case 5:
        return styles.imageIcon;
      case 6:
        return styles.imageIconLike;
      case 7:
        return styles.imageIconUnderstand;
      case 8:
        return styles.imageIconBow;
      case 9:
        return styles.imageIconCongrats;
    }
  }, []);

  const removeReaction = async (idMsg: any) => {
    const body = {
      message_id: id,
      reaction_id: idMsg,
    };
    try {
      const res = await removeReactionApi(body);
      getListReaction();
      socket.emit('message_ind2', {
        user_id: user_id,
        room_id: room_id,
        task_id: null,
        to_info: null,
        level: res?.data?.data?.msg_level,
        message_id: null,
        message_type: 3,
        method: 0,
        attachment_files: res?.data?.attachmentFiles,
        stamp_no: idMsg,
        relation_message_id: res?.data?.data?.id,
        text: res?.data?.data?.message,
        text2: null,
        time: res?.data?.data?.created_at,
      });
      dispatch(
        editMessageAction({id: res?.data?.data.id, data: res?.data?.data}),
      );
    } catch (error) {}
  };

  const renderItem = ({item}: any) => (
    <>
      <TouchableOpacity
        style={styles.viewItem}
        disabled={item?.user_id !== user_id}
        onPress={() => removeReaction(item?.id)}>
        <View style={[styles.viewImage, {alignItems: 'flex-start'}]}>
          <FastImage
            style={styles.imageAvatar}
            source={
              item?.user?.icon_image
                ? {
                    uri: item?.user?.icon_image,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                  }
                : defaultAvatar
            }
          />
        </View>
        <View style={styles.viewContentTxt}>
          <Text style={styles.txtName}>
            {item?.user?.last_name} {item?.user?.first_name}
          </Text>
          {item?.user_id === user_id && (
            <Text style={styles.txtDelete}>
              削除するにはここをクリックしてください
            </Text>
          )}
        </View>
        <View style={[styles.viewImage, {alignItems: 'flex-end'}]}>
          <FastImage
            style={renderStyleIcon(item.reaction_no)}
            source={renderIcon(item.reaction_no)}
          />
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <Header back imageCenter title="反応" />
      <View style={styles.viewContent}>
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item: any, index: any) => index.toString()}
        />
      </View>
    </View>
  );
};

export {ListReaction};
