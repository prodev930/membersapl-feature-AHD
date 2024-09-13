import {colors, stylesCommon} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const HeaderButton = React.memo((props: any) => {
  const {active, onActive} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={active === 1 ? styles.buttonActive : styles.buttonInactive}
        onPress={() => onActive(1)}>
        <Text style={styles.txtButton}>メディア</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={active === 2 ? styles.buttonActive : styles.buttonInactive}
        onPress={() => onActive(2)}>
        <Text style={styles.txtButton}>ファイル</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={active === 3 ? styles.buttonActive : styles.buttonInactive}
        onPress={() => onActive(3)}>
        <Text style={styles.txtButton}>URL</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: moderateVerticalScale(15),
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: moderateScale(28),
  },
  buttonInactive: {
    width: moderateScale(102),
    height: moderateVerticalScale(32),
    borderRadius: moderateScale(60),
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  buttonActive: {
    width: moderateScale(102),
    height: moderateVerticalScale(32),
    borderRadius: moderateScale(60),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  txtButton: {
    color: '#FFFFFF',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
});

export {HeaderButton};
