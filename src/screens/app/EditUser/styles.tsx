import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

import {stylesCommon, colors} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    ...stylesCommon.viewContainer,
    backgroundColor: colors.background,
  },
  linearGradient: {
    flex: 1,
    padding: 1,
    borderRadius: moderateScale(10),
    margin: scale(20),
  },
  viewForm: {
    ...stylesCommon.viewContainer,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(25),
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(40),
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    marginBottom: verticalScale(11),
  },
  viewSelectUser: {
    padding: scale(10),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: verticalScale(20),
    borderRadius: moderateScale(8),
    // marginBottom: verticalScale(20),
  },
  input: {
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight500,
    paddingVertical: verticalScale(5),
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(10),
  },
  viewTxtArray: {
    backgroundColor: '#F4A217',
    marginTop: verticalScale(6),
    marginRight: scale(6),
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(18),
    borderRadius: moderateScale(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtArray: {
    color: colors.white,
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight500,
  },
  iconClose: {
    width: moderateScale(9),
    height: moderateScale(9),
    tintColor: colors.white,
    marginLeft: scale(9),
  },
  viewResultSearch: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
  },
  button: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(60),
  },
  viewItemResultUser: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  multiline: {
    height: verticalScale(150),
  },
  inputMultiline: {
    textAlign: 'right',
    textAlignVertical: 'top',
    paddingTop: verticalScale(8),
  },
});

export {styles};
