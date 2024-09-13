import {StyleSheet, Dimensions} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

const height_screen = Dimensions.get('window').height;

const styles = StyleSheet.create({
  view: {
    ...stylesCommon.viewContainer,
    backgroundColor: colors.background,
  },
  container: {
    ...stylesCommon.viewContainer,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    backgroundColor: colors.background,
  },
  image: {
    width: verticalScale(119),
    height: verticalScale(119),
    marginTop: verticalScale(60),
  },
  linearGradient: {
    height:
      height_screen -
      verticalScale(30) -
      verticalScale(60) -
      verticalScale(119) -
      verticalScale(40),
    marginTop: verticalScale(30),
    borderRadius: moderateScale(10),
    padding: 1,
    backgroundColor: '#FFFFFF',
  },
  viewContent: {
    borderRadius: moderateScale(10),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: verticalScale(40),
  },
  txtTitleLogin: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
    color: colors.darkGrayText,
    marginBottom: verticalScale(44),
  },
  viewBottom: {
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  txtBottom: {
    color: colors.darkGrayText,
    fontSize: moderateScale(16),
  },
});

export {styles};
