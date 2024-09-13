import {StyleSheet} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {verticalScale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  content: {
    flex: 1,
  },
  viewButtonTop: {
    flexDirection: 'row',
    paddingVertical: verticalScale(16),
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTxtButton: {
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
  },
  styleTxtButtonActive: {
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight600,
    color: colors.primary,
  },
});

export {styles};
