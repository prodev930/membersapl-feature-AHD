import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import {iconNext, defaultAvatar, iconPin} from '@images';
import FastImage from 'react-native-fast-image';
import {convertString} from '@util';

const ItemSearchMessage = React.memo((props: any) => {
  const {item, onClickItem} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onClickItem}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <View style={styles.image}>
            <FastImage
              style={styles.image}
              source={
                item?.user_send?.icon_image
                  ? {
                      uri: item?.user_send?.icon_image,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }
                  : defaultAvatar
              }
            />
          </View>
        </View>
        <View style={styles.viewTxt}>
          <>
            <Text style={styles.txtContent} numberOfLines={1}>
              {item?.user_send?.last_name} {item?.user_send?.first_name}
            </Text>
            <Text style={styles.txtTitle} numberOfLines={2}>
              {convertString(item?.message)}
            </Text>
            <Text style={styles.txtDate} numberOfLines={2}>
              {item?.created_at}
            </Text>
          </>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: scale(16),
    paddingRight: scale(16),
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
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '80%',
    justifyContent: 'center',
  },
  viewImageNext: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.primary,
    marginTop: verticalScale(3),
  },
  txtContent: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
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
  txtDate: {
    fontSize: moderateScale(14),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
    marginTop: verticalScale(3),
  },
});

export {ItemSearchMessage};
