import {colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AppButton} from '../AppButton';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {iconClose} from '@images';
import {HITSLOP} from '@util';

const ModalRemoveUser = React.memo((prop: any) => {
  const {titleHeader, onCancel, onConfirm, visible, nameUser} = prop;
  const closeModal = () => {
    onCancel();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{titleHeader}</Text>
            <TouchableOpacity
              hitSlop={HITSLOP}
              style={styles.buttonClose}
              onPress={closeModal}>
              <Image
                source={iconClose}
                style={{tintColor: colors.darkGrayText}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.txtContent}>
            {nameUser} をグループから削除します。
          </Text>
          <View style={styles.viewButton}>
            <AppButton
              title="退出"
              onPress={onConfirm}
              styleButton={styles.button}
            />
          </View>
        </View>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(17),
  },
  container: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: moderateScale(10),
    // alignItems: 'center',
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  viewHeader: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '48.5%',
    backgroundColor: '#F87A7A',
  },
  buttonClose: {
    position: 'absolute',
    right: scale(17),
  },
  txtContent: {
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    marginVertical: verticalScale(16),
    textAlign: 'center',
    marginHorizontal: scale(17),
  },
});

export {ModalRemoveUser};
