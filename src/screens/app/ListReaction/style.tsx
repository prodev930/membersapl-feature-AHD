import {StyleSheet} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  viewItem: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },
  viewImage: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContentTxt: {
    width: '70%',
    justifyContent: 'center',
  },
  imageAvatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
    color: colors.darkGrayText,
  },
  txtDelete: {
    marginTop: verticalScale(8),
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.border,
  },
  imageIcon: {
    width: moderateScale(23),
    height: moderateScale(23),
  },
  imageIconHeart: {
    width: moderateScale(23),
    height: moderateScale(20),
  },
  imageIconLike: {
    width: moderateScale(20),
    height: moderateScale(23),
  },
  imageIconUnderstand: {
    width: moderateScale(22),
    height: moderateScale(20),
  },
  imageIconBow: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  imageIconCongrats: {
    width: moderateScale(22),
    height: moderateScale(20),
  },
});

export {styles};
