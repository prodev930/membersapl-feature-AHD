import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import {iconDelete, iconEdit} from '@images';

const ViewItem = React.memo((props: any) => {
  const {title, hideBorder, isListEdit, disableButton, onPress, onEdit, onDelete} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.item, {borderBottomWidth: hideBorder === true ? 0 : 1}]}
        disabled={disableButton}
        onPress={onPress}>
        <Text style={styles.txtItem}>{title}</Text>
        {isListEdit ? (
          <View style={styles.viewRow}>
            <TouchableOpacity
              onPress = {onEdit}
            >
              <Image
                source={iconEdit}
                style={[styles.icon, {marginRight: 10}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress = {onDelete}
            >
              <Image source={iconDelete} style={styles.icon} />
            </TouchableOpacity>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: moderateVerticalScale(16),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(14),
    borderColor: '#D6D6D6',
  },
  txtItem: {
    color: '#595757',
    fontSize: moderateVerticalScale(14),
    fontWeight: '400',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: moderateVerticalScale(22),
    height: moderateVerticalScale(22),
    tintColor: '#595757',
  },
});

export {ViewItem};
