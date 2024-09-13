import {colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {iconClose} from '@images';
import {HITSLOP} from '@util';
import {getInviteLink} from '@services';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';

const width = Dimensions.get('window').width;
const ModalLink = React.memo((prop: any) => {
  const {titleHeader, onCancel, visible, idRoomChat} = prop;
  const [loading, setLoading] = useState(true);
  const [dataLink, setDataLink] = useState<any>(null);

  const getData = useCallback(async () => {
    try {
      const body = {
        room_id: idRoomChat,
      };
      const res = await getInviteLink(body);
      setDataLink(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  }, [idRoomChat]);

  useEffect(() => {
    if (visible === true) {
      getData();
    }
  }, [getData, visible]);

  const closeModal = () => {
    onCancel();
  };

  const copyLink = useCallback(text => {
    Clipboard.setString(text);
    showMessage({
      message: 'コピー',
      backgroundColor: colors.backgroundTab,
      color: '#FFFFFF',
      position: {
        bottom: 0,
        left: width / 2 - scale(50 + 10),
        right: width / 2 - scale(50),
      },
      duration: 500,
      style: {
        width: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, []);

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
          {loading === false ? (
            <View style={styles.viewContent}>
              <Text style={styles.txtTitleContent}>メンバー招待用</Text>
              <View style={styles.viewItem}>
                <View style={styles.viewInput}>
                  <Text numberOfLines={1} style={styles.content}>
                    {dataLink?.url}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => copyLink(dataLink?.url)}>
                  <Text style={styles.txtButton}>コピー</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewLoading}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          )}
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
    width: '23%',
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(4),
    alignItems: 'center',
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
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewContent: {
    paddingHorizontal: scale(17),
    marginVertical: verticalScale(30),
  },
  viewInput: {
    width: '70%',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(4),
    backgroundColor: '#FFFFFF',
    marginTop: verticalScale(10),
  },
  txtTitleContent: {
    marginTop: verticalScale(16),
    color: colors.darkGrayText,
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight600,
  },
  content: {
    color: colors.darkGrayText,
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight600,
  },
  viewLoading: {
    width: '100%',
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export {ModalLink};
