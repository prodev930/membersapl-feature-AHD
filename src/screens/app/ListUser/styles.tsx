import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    ...stylesCommon.viewContainer,
    paddingHorizontal: scale(20),
  },
  containerSearch: {
    marginTop: verticalScale(20),
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(13),
  },
  input: {
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(14),
  },
  icon: {
    width: moderateScale(15),
    height: moderateScale(15),
    tintColor: colors.placeholder,
  },
  colorIcon: {
    tintColor: colors.darkGrayText,
  },
});

export {styles};
