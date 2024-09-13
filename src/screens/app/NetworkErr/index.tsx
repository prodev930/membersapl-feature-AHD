import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {Header} from '@component';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {iconNetWorkErr} from '@images';

const NetworkErr = (props: any) => {
  const {route} = props;
  const {message} = route?.params;
  // let message = '2022/07/08 16:53';
  return (
    <View style={styles.container}>
      <Header back imageCenter title="通知する" />
      <View style={styles.viewContent}>
        <Image source={iconNetWorkErr} style={styles.icon} />
        <Text style={styles.txtTitle}>
          {`メンテナンス中です。\n【メンテナンス日時】\n ${message} \n ご利用中の皆様にはご迷惑をおかけし、大変申し訳ございません。\n メンテナンス終了までしばらくお待ちください。`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
    color: colors.darkGrayText,
    marginTop: verticalScale(30),
    textAlign: 'center',
    paddingHorizontal: scale(10),
  },
  icon: {
    width: moderateScale(300),
    height: moderateScale(300),
  },
});

export {NetworkErr};
