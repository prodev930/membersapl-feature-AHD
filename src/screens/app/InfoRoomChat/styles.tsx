import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#FFFFFF',
  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(36),
    width: '100%',
  },
  viewAvatar: {
    width: verticalScale(126),
    height: verticalScale(126),
    justifyContent: 'center',
  },
  avatar: {
    width: verticalScale(126),
    height: verticalScale(126),
    borderRadius: verticalScale(126) / 2,
  },
  buttonCamera: {
    width: verticalScale(33),
    height: verticalScale(33),
    borderRadius: verticalScale(33) / 2,
    backgroundColor: colors.darkGrayText,
    position: 'absolute',
    right: -verticalScale(33) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    width: verticalScale(33),
    height: verticalScale(33),
    borderRadius: verticalScale(33) / 2,
    position: 'absolute',
    right: -verticalScale(33) / 2,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrayText,
  },
  pinButton: {
    width: verticalScale(33),
    height: verticalScale(33),
    borderRadius: verticalScale(33) / 2,
    position: 'absolute',
    right: -verticalScale(33) / 2,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogout: {
    flexDirection: 'row',
    paddingVertical: verticalScale(25),
    alignItems: 'center',
  },
  txtLogout: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
    color: '#EA5A31',
    marginLeft: scale(16),
  },
  inActive: {
    tintColor: '#989898',
    width: moderateScale(19),
    height: moderateScale(24),
    marginLeft: scale(8)
  },
  active: {
    width: moderateScale(19),
    height: moderateScale(24),
    marginLeft: scale(8)
  },
  marginTop: {
    marginTop: verticalScale(20),
  },
});

export {styles};
