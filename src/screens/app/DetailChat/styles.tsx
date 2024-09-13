import {StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {colors, stylesCommon} from '@stylesCommon';
import {IS_IOS} from '@util';

const ATTACH_ICON_WIDTH = 24;
export const TOOLBAR_MIN_HEIGHT = 36;
const SEND_BUTTON_WIDTH = 30;
export const calPositionButton = (height: number) =>
  (TOOLBAR_MIN_HEIGHT - height) / 2;
export const MIN_COMPOSER_HEIGHT = IS_IOS ? 22 : 28;

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  attachIcon: {
    width: ATTACH_ICON_WIDTH,
    height: ATTACH_ICON_WIDTH,
    bottom: calPositionButton(ATTACH_ICON_WIDTH),
    marginBottom: 0,
    marginLeft: scale(15),
  },
  viewPinMessage: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerMessage: {
    backgroundColor: '#FFFFFF',
  },
  viewPartCopy: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  viewPartCopyOverlay: {
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerChat: {
    marginLeft: scale(43),
    marginRight: scale(14),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: verticalScale(16),
    maxHeight: '66%',
  },
  partCopyText: {
    color: colors.darkGrayText,
    fontSize: moderateScale(15),
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    color: colors.primary,
  },
  txtContent: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.darkGrayText,
    marginTop: verticalScale(3),
  },
  iconDelete: {
    tintColor: colors.darkGrayText,
  },
  viewContent: {
    width: '90%',
  },
  viewIcon: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewRepMessage: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  viewIconRepMessage: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTxtRepMessage: {
    width: '70%',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  iconReply: {
    width: moderateScale(25),
    height: moderateScale(25),
    tintColor: colors.primary,
  },
  iconClose: {
    tintColor: colors.darkGrayText,
  },
  name: {
    fontSize: 14,
    color: colors.primary,
    ...stylesCommon.fontWeight600,
    marginBottom: verticalScale(5),
  },
  content: {
    fontSize: 12,
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
  },
  colorIcon: {
    tintColor: colors.darkGrayText,
  },
  size: {
    width: 23,
    height: 23,
  },
  imageSmall: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  buttonRight: {
    marginRight: 16,
    marginLeft: 10,
    marginBottom: 0,
    width: SEND_BUTTON_WIDTH,
    height: SEND_BUTTON_WIDTH,
    bottom: calPositionButton(SEND_BUTTON_WIDTH),
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  viewTask: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '68%',
  },
  viewTaskWithKeyboard: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '28%',
  },
  viewTaskWithFiles: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '57%',
  },
  viewTaskWithKeyboardFiles: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '18%',
  },
  displayNone: {
    display: 'none',
  },
  activeSendButton: {
    backgroundColor: '#1EB7C1',
    borderRadius: 21,
  },
  sendButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const footerStyles = (accessoryHeight: number, isShowKeyboard: boolean) =>
  StyleSheet.create({
    footerView: {
      height:
        // 20 is bottom space between message and input toolbar and 16 or 28 is padding bottom of input toolbar
        accessoryHeight +
        20 +
        (isShowKeyboard ? 16 : 28) +
        (isShowKeyboard ? getBottomSpace() : 0),
    },
  });

export {styles, footerStyles};
