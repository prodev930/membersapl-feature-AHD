import {StyleSheet, Dimensions} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const height_screen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
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
    width: '100%',
    height: '100%',
  },
  createTaskButtonView: {
    paddingHorizontal: scale(10),
    marginTop: scale(26),
    marginBottom: scale(20),
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
  viewBottom: {
    height: height_screen >= 812 ? verticalScale(50) : verticalScale(25),
  },
  colorIcon: {
    tintColor: colors.darkGrayText,
  },
  size: {
    width: 23,
    height: 23,
  },
  addBtn: {},
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
  buttonRight: {marginRight: 16, marginLeft: 0},
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  displayNone: {
    display: 'none',
  },
  blackout: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#787878',
    opacity: 0.9,
  },
  txtEmpty: {
    textAlign: 'center',
    color: colors.darkGrayText,
    marginTop: scale(15),
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
});

export {styles};
