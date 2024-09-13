import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AppButton} from '@component';
import {iconClose} from '@images';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {colors, stylesCommon} from '@stylesCommon';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {HITSLOP} from '@util';

const ModalPickFile = React.memo((prop: any) => {
  const {choseFile, onCancel, chosePhoto, visible} = prop;
  const closeModal = () => {
    onCancel();
  };
  return (
    <Modal
      supportedOrientations={['landscape', 'portrait']}
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
            <TouchableOpacity
              style={styles.buttonClose}
              hitSlop={HITSLOP}
              onPress={closeModal}>
              <Image source={iconClose} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.txtHeader}>ファイルを選ぶ</Text>
          </View>
          <AppButton
            title="写真/ビデオを選択してください"
            onPress={chosePhoto}
            styleButton={styles.button}
            styleTitle={styles.txtTitle}
          />
          <AppButton
            title="ファイルを選択してください"
            onPress={choseFile}
            styleButton={[styles.button, {borderBottomWidth: 0}]}
            styleTitle={styles.txtTitle}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    borderRadius: moderateScale(4),
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: getBottomSpace() + 20,
    backgroundColor: '#FFFFFF',
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  viewHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(25),
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: moderateScale(18),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    paddingVertical: verticalScale(20),
    borderColor: colors.border,
  },
  txtTitle: {
    fontSize: moderateScale(16),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
  },
  icon: {
    tintColor: colors.darkGrayText,
  },
  buttonClose: {
    position: 'absolute',
    left: 0,
  },
});

export {ModalPickFile};
