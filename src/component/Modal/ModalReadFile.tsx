import {colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {AppButton} from '../AppButton';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {iconBack, iconDowload} from '@images';
import {HITSLOP} from '@util';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {WebView} from 'react-native-webview';

const ModalReadFile = React.memo((prop: any) => {
  const {data, onClose} = prop;

  const onDowload = useCallback(() => {
    Linking.openURL(data?.path);
  }, [data]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={data?.show}
      onRequestClose={() => {}}>
      <View style={styles.containerModal}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={onClose} hitSlop={HITSLOP}>
            <Image source={iconBack} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDowload}>
            <Image source={iconDowload} style={styles.iconDowload} />
          </TouchableOpacity>
        </View>
        <WebView
          source={{
            uri: `http://docs.google.com/gview?embedded=true&url=${data?.path}`,
          }}
          style={styles.webview}
          javaScriptEnabled={true}
          cacheEnabled={true}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewHeader: {
    width: '100%',
    marginTop: getStatusBarHeight() + verticalScale(20),
    paddingHorizontal: scale(17),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconDowload: {
    tintColor: colors.primary,
    width: 25,
    height: 25,
  },
  webview: {
    flex: 1,
  },
  viewLoading: {
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
});

export {ModalReadFile};
