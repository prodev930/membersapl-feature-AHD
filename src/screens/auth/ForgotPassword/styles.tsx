import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  view: {
    ...stylesCommon.viewContainer,
    backgroundColor: colors.background,
  },
  container: {
    ...stylesCommon.viewContainer,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    backgroundColor: colors.background,
  },
  image: {
    width: '119@vs',
    height: '119@vs',
  },
  linearGradient: {
    width: '100%',
    marginTop: '30@vs',
    borderRadius: '10@ms',
    padding: 1,
    backgroundColor: '#FFFFFF',
  },
  viewContent: {
    borderRadius: '10@ms',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '24@s',
    paddingVertical: '40@vs',
  },
  txtTitleLogin: {
    ...stylesCommon.fontWeight500,
    fontSize: '16@ms',
    color: colors.darkGrayText,
    marginBottom: '30@vs',
  },
  viewBottom: {
    marginTop: '20@vs',
    alignItems: 'center',
  },
  txtBottom: {
    color: colors.darkGrayText,
    fontSize: '16@ms',
  },
  titleInput: {
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    marginBottom: '11@vs',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: '24@ms',
    color: colors.darkGrayText,
    marginTop: '20@vs',
  },
  buttonBack: {
    width: '100%',
    marginTop: '40@vs',
    marginBottom: '10@vs'
  },
});

export {styles};
