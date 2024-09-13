import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {getBottomSpace} from 'react-native-iphone-x-helper';

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
    // marginTop: verticalScale(20),
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
  textTitleInput: {
    color: '#595757',
    fontSize: 14,
    ...stylesCommon.fontWeight500,
    marginTop: 15,
    marginBottom: 10,
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: getBottomSpace() + 20,
    paddingHorizontal: scale(16),
    paddingTop: 10,
  },
  button:{

  },
  viewLoading:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  }
});

export {styles};
