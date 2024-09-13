import {StyleSheet} from 'react-native';
import {colors} from '@stylesCommon';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: moderateScale(300),
    height: moderateScale(300),
  },
});

export {styles};
