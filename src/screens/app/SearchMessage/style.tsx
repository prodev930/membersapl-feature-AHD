import {StyleSheet, Dimensions} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    // paddingHorizontal: scale(16),
  },
  containerSearch: {
    marginTop: verticalScale(20),
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(13),
    width: width - scale(32),
    marginLeft: scale(16),
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
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
  colorIcon: {
    tintColor: colors.darkGrayText,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(3),
    width: width - scale(32),
  },
  txtTitleTotal: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
  },
  txtTotal: {
    color: colors.primary,
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(14),
  },
});

export {styles};
