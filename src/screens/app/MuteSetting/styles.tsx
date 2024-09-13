import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    paddingHorizontal: scale(16),
  },
  item: {
    paddingVertical: verticalScale(18),
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});

export {styles};
