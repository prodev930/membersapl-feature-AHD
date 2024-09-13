import React, {useCallback} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {iconClose, iconQuote} from '@images';
import {colors, stylesCommon} from '@stylesCommon';
import {saveMessageQuote} from '@redux';

import MessageInfo from '../components/MessageInfo';

const ModalQuote = React.memo(() => {
  const dispatch = useDispatch();
  const messageQuote = useSelector((state: any) => state.chat?.messageQuote);

  const removeReplyMessage = useCallback(() => {
    dispatch(saveMessageQuote(null));
  }, []);

  return (
    <View style={styles.viewRepMessage}>
      <View style={styles.viewIconRepMessage}>
        <Image source={iconQuote} style={styles.iconReply} />
      </View>
      <View style={styles.viewTxtRepMessage}>
        <Text style={styles.name}>引用メッセージ</Text>
        {messageQuote?.text ? (
          <MessageInfo
            text={messageQuote?.text}
            textSetting={{numberOfLines: 1}}
          />
        ) : (
          <></>
        )}
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
  imageLike: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginHorizontal: moderateScale(2),
    tintColor: colors.primary,
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

export {ModalQuote};
