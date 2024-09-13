import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {defaultAvatar} from '@images';
import {moderateScale, scale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';

const ViewUserSeen = React.memo((props: any) => {
  const {item, index, data} = props;

  //Logic check hiển thị UI của người dùng khi có khoảng 90 người
  const renderMore = () => {
    return (
      <>
        {index === 6 ? (
          <View style={styles.viewMore}>
            <Text style={styles.txtMore}>+{data?.length - index + 1}</Text>
          </View>
        ) : null}
      </>
    );
  };

  //Logic check hiển thị UI của người dùng khi có khoảng 100 người trở lên
  const renderMoreLarge = () => {
    return (
      <>
        {index === 6 ? (
          <Text style={styles.txtMore}>
            ... と {data?.length - index + 1} その他
          </Text>
        ) : null}
      </>
    );
  };

  return (
    <>
      {data?.length < 100 ? (
        <>
          {index <= 5 ? (
            <FastImage
              style={styles.container}
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
          ) : (
            renderMore()
          )}
        </>
      ) : (
        <>
          {index <= 5 ? (
            <FastImage
              style={styles.container}
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
          ) : (
            renderMoreLarge()
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: moderateScale(11),
    height: moderateScale(11),
    borderRadius: moderateScale(11) / 2,
    marginHorizontal: scale(2),
  },
  viewMore: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20) / 2,
    marginHorizontal: scale(2),
    backgroundColor: '#CBEEF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMore: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(8),
    color: colors.darkGrayText,
  },
});

export {ViewUserSeen};
