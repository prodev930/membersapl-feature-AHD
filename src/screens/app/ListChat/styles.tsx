import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {
  scale,
  moderateScale,
  verticalScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

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
    marginTop: verticalScale(20),
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
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
  colorIcon: {
    tintColor: colors.darkGrayText,
  },
  containerMenu: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewOption: {
    alignItems: 'flex-end',
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  viewFilter: {
    width: '100%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    marginBottom: moderateVerticalScale(8),
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    marginLeft: verticalScale(19),
    color: colors.backgroundTab,
  },
});

export {styles};
