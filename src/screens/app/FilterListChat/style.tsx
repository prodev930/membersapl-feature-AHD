import {StyleSheet, Dimensions} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {colors} from '@stylesCommon';

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(17),
    maxHeight: '80%',
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    marginVertical: verticalScale(41),
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: colors.darkGrayText,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48.5%',
    backgroundColor: colors.darkGrayText,
  },
});

export {styles};
