import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {decode} from 'html-entities';

import {colors, stylesCommon} from '@stylesCommon';
import {
  defaultAvatar,
  iconPdf,
  iconDoc,
  iconXls,
  iconFile,
  iconDelete,
} from '@images';
import {convertString} from '@util';

const Item = React.memo((props: any) => {
  const {item, onClickItem, onDeleteItem} = props;

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
            {item?.message ? (
              <Text style={styles.txtTitle} numberOfLines={2}>
                {convertString(decode(item?.message?.split('<br>').join('\n')))}{' '}
              </Text>
            ) : null}
            {item?.stamp_no ? (
              <Image
                style={styles.imageStamp}
                source={{uri: item?.stamp_icon}}
              />
            ) : null}
            {item?.attachment_files?.length > 0 ? (
              <View style={styles.viewRow}>
                {item?.attachment_files?.map((file: any) => (
                  <View key={file?.id}>
                    {file?.type == 4 ? (
                      <FastImage
                        source={{
                          uri: file?.path,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        style={styles.imageSmall}
                      />
                    ) : (
                      <Image
                        source={renderImgaeFile(file?.type)}
                        style={styles.imageFile}
                      />
                    )}
                  </View>
                ))}
              </View>
            ) : null}
            <Text style={styles.txtDate} numberOfLines={2}>
              {item?.created_at}
            </Text>
          </>
        </View>
        <View style={styles.viewDelete}>
          <TouchableOpacity onPress={onDeleteItem}>
            <Image source={iconDelete} style={styles.imageDelete} />
          </TouchableOpacity>
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
    width: '70%',
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
  imageStamp: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginHorizontal: moderateScale(2),
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
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
  viewDelete: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageDelete: {
    tintColor: 'red',
  },
});

export {Item};
