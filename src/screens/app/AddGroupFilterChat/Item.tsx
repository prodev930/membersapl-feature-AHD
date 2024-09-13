import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {defaultAvatar, iconActiveGroup, iconInActiveGroup} from '@images';
import FastImage from 'react-native-fast-image';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';

const Item = React.memo((props: any) => {
  const {item, index, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        style={styles.imageCheck}
        source={item?.checked === false ? iconInActiveGroup : iconActiveGroup}
      />
      {item?.one_one_check?.length > 0 ? (
        <FastImage
          style={styles.imageAvatar}
          source={
            item?.one_one_check?.length > 0 &&
            item?.one_one_check[0]?.icon_image
              ? {
                  uri: item?.one_one_check[0]?.icon_image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }
              : defaultAvatar
          }
        />
      ) : (
        <FastImage
          style={styles.imageAvatar}
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
      )}
      <Text numberOfLines={1} style={styles.txtName}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageAvatar: {
    width: moderateVerticalScale(24),
    height: moderateVerticalScale(24),
    marginLeft: scale(12),
    marginRight: scale(8),
    borderRadius: moderateVerticalScale(12),
  },
  imageCheck: {
    width: moderateVerticalScale(24),
    height: moderateVerticalScale(24),
  },
  txtName: {
    fontSize: moderateVerticalScale(14),
    color: colors.backgroundTab,
    flex: 1,
  },
});

export {Item};
