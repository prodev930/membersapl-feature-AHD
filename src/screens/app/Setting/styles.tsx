import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewHeader: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
  },
  viewAvatar: {
    width: verticalScale(80),
    height: verticalScale(80),
    justifyContent: 'center',
  },
  avatar: {
    width: verticalScale(80),
    height: verticalScale(80),
    borderRadius: verticalScale(80) / 2,
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
  viewInfoTxt:{
    justifyContent: 'center',
    paddingLeft: scale(16)
  },
  txtName:{
    ...stylesCommon.fontWeight600,
    color: '#FFFFFF',
    fontSize: moderateScale(16)
  },
  txtMail:{
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    ...stylesCommon.fontWeight600,
    marginTop: verticalScale(4)
  }
});

export {styles};
