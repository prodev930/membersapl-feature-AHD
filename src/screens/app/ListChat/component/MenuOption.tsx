import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';

const MenuOption = React.memo((props: any) => {
  const {onSearchRoom, onSearchMessage} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {borderBottomWidth: 1, borderColor: '#DDDDDD'}]}
        onPress={onSearchRoom}>
        <Text style={styles.txtTitle}>グループ名で検索</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSearchMessage}>
        <Text style={styles.txtTitle}>メッセージ内容を検索</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingVertical: verticalScale(12),
    width: scale(180),
    paddingLeft: scale(16),
  },
  txtTitle: {
    fontSize: moderateScale(14),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
  },
});

export {MenuOption};
