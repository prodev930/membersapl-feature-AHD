import {colors, stylesCommon} from '@stylesCommon';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  moderateVerticalScale,
  scale,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters';
import {iconListFile, defaultAvatar} from '@images';
import Autolink from 'react-native-autolink';
import {convertString} from '@util';

const width_screen = Dimensions.get('window').width;

const ItemUrl = React.memo((props: any) => {
  const {item, openFile} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={openFile}>
      <Image
        source={
          item?.user_send?.icon_image
            ? {uri: item?.user_send?.icon_image}
            : defaultAvatar
        }
        style={styles.viewImage}
      />
      <View style={styles.viewContent}>
        <Autolink
          text={item?.message}
          email
          url
          renderText={text => (
            <Text style={styles.txtMessage}>{convertString(text)}</Text>
          )}
          onPress={(url, match) => {
            switch (match.getType()) {
              case 'url':
                return null;
              default:
                return null;
            }
          }}
        />
        <Text style={styles.txtSize}>{item?.created_at}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: width_screen,
    flexDirection: 'row',
    paddingHorizontal: scale(22),
    marginTop: verticalScale(16),
    alignItems: 'center',
  },
  viewImage: {
    width: moderateVerticalScale(51),
    height: moderateVerticalScale(52),
    borderRadius: moderateVerticalScale(51) / 2,
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  viewContent: {
    flex: 1,
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    fontSize: moderateScale(16),
  },
  txtSize: {
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    fontSize: moderateScale(16),
    marginTop: verticalScale(4),
  },
  txtMessage: {
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
  },
});

export {ItemUrl};
