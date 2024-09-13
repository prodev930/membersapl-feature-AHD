import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {
  CHAT_STAMP_URLS,
  iconClose,
  iconDoc,
  iconFile,
  iconPdf,
  iconXls,
  menuReply,
} from '@images';
import {saveMessageReply} from '@redux';
import {colors, stylesCommon} from '@stylesCommon';

import MessageInfo from '../components/MessageInfo';

const ModalReply = React.memo(() => {
  const dispatch = useDispatch();
  const messageReply = useSelector((state: any) => state.chat?.messageReply);

  const removeReplyMessage = useCallback(() => {
    dispatch(saveMessageReply(null));
  }, []);

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

  const renderStamp = useCallback(() => {
    return CHAT_STAMP_URLS[messageReply?.stamp_no];
  }, [messageReply?.stamp_no]);

  return (
    <View style={styles.viewRepMessage}>
      <View style={styles.viewIconRepMessage}>
        <Image source={menuReply} style={styles.iconReply} />
      </View>
      <View style={styles.viewTxtRepMessage}>
        <Text style={styles.name}>返信メッセージ</Text>
        {messageReply?.text ? (
          <MessageInfo
            text={messageReply?.text}
            textSetting={{numberOfLines: 1}}
          />
        ) : null}
        {messageReply?.attachment_files?.length > 0 ? (
          <View style={styles.viewRow}>
            {messageReply?.attachment_files?.map((item: any) => (
              <View key={item?.id}>
                {item?.type == 4 ? (
                  <FastImage
                    source={{
                      uri: item?.path,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }}
                    style={styles.imageSmall}
                  />
                ) : (
                  <Image
                    source={renderImgaeFile(item?.type)}
                    style={styles.imageFile}
                  />
                )}
              </View>
            ))}
          </View>
        ) : null}
        {messageReply?.stamp_no ? (
          <Image source={renderStamp()} style={styles.imageStamp} />
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.viewIconRepMessage}
        onPress={removeReplyMessage}>
        <Image source={iconClose} style={styles.iconClose} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  viewRepMessage: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  viewIconRepMessage: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconReply: {
    width: moderateScale(25),
    height: moderateScale(25),
    tintColor: colors.primary,
  },
  viewTxtRepMessage: {
    width: '70%',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  name: {
    fontSize: 14,
    color: colors.primary,
    ...stylesCommon.fontWeight600,
    marginBottom: verticalScale(5),
  },
  content: {
    fontSize: 12,
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
  },
  viewRow: {
    flexDirection: 'row',
  },
  imageSmall: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  imageStamp: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginHorizontal: moderateScale(2),
  },
  iconClose: {
    tintColor: colors.darkGrayText,
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  txtNameFile: {
    fontSize: moderateScale(12),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginLeft: scale(5),
  },
  viewRowFile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {ModalReply};
