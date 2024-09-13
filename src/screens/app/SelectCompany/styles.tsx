import {StyleSheet, Dimensions} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(16),
  },
  containerSearch: {
    marginTop: verticalScale(20),
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(13),
  },
  input: {
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight500,
  },
  icon: {
    width: moderateScale(15),
    height: moderateScale(15),
    tintColor: colors.border,
  },
  viewBottom: {
    paddingHorizontal: scale(16),
    paddingBottom: height >= 812 ? getBottomSpace() + 5 : 12,
    paddingTop: verticalScale(10),
  },
  item: {
    paddingVertical: verticalScale(15),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  viewActive: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContentItem: {
    width: '85%',
  },
  viewActiveInfo: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20 / 2),
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtID: {
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    fontSize: moderateScale(14),
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    color: colors.darkGrayText,
    fontSize: moderateScale(16),
    marginTop: 2,
  },
  txtIDContent: {
    ...stylesCommon.fontWeight500,
    color: colors.primary,
    fontSize: moderateScale(14),
    marginTop: 2,
  },
  active: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12 / 2),
    backgroundColor: '#8BC227',
  },
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
});

export {styles};
