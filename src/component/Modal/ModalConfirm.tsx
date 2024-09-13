import {colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {AppButton} from '../AppButton';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

const ModalConfirm = React.memo((prop: any) => {
  const {titleHeader, onCancel, onConfirm, visible, contentHeader} = prop;
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
          <Text style={styles.txtHeader}>{titleHeader}</Text>
          {contentHeader ? (
            <Text style={[styles.txtHeader, {marginTop: 0}]}>
              {contentHeader}
            </Text>
          ) : null}
          <View style={styles.viewButton}>
            <AppButton
              title="はい"
              onPress={onConfirm}
              styleButton={styles.button}
            />
            <AppButton
              title="いいえ"
              onPress={closeModal}
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
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    padding: 10,
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    marginVertical: verticalScale(41),
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: colors.darkGrayText,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48.5%',
    backgroundColor: colors.darkGrayText,
  },
});

export {ModalConfirm};
