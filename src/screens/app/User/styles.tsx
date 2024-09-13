import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
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
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: -verticalScale(33) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    width: verticalScale(33),
    height: verticalScale(33),
    borderRadius: verticalScale(33) / 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: -verticalScale(33) / 2,
    bottom: 0,
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
});

export {styles};
