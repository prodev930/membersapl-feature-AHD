import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import {colors, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(3),
  },
  containerCurrent: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(3),
  },
  viewCenter: {
    width: '100%',
    paddingHorizontal: scale(11),
    marginBottom: scale(30),
    alignItems: 'center',
  },
  containerViewChat: {
    maxWidth: '100%',
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(0),
    borderRadius: verticalScale(16),
  },
  containerAdditionalChat: {
    maxWidth: '80%',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    borderRadius: verticalScale(16),
    marginBottom: scale(-10),
  },
  containerViewChatWrap: {
    maxWidth: '75%',
  },
  containerChat: {
    maxWidth: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: verticalScale(16),
  },
  containerAdditionalMessage: {
    maxWidth: '100%',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    borderRadius: verticalScale(16),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  containerAdditionalMessageText: {
    fontSize: moderateScale(10),
    color: colors.darkGrayText,
  },
  chat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtTime: {
    marginLeft: scale(3),
    color: colors.border,
    fontSize: moderateScale(8),
  },
  image: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(7),
    borderRadius: scale(26 / 2),
    marginTop: verticalScale(15),
  },
  txtTimeCurent: {
    marginRight: scale(7),
    color: colors.border,
    fontSize: moderateScale(8),
  },
  viewAvatar: {
    // borderWidth: 1,
  },
  containerMenu: {
    marginTop: moderateVerticalScale(-125),
  },
  viewReaction: {
    marginTop: verticalScale(-8),
    marginLeft: scale(26) + scale(7),
    alignItems: 'center',
  },
  reaction: {
    flexDirection: 'row',
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
    borderRadius: moderateScale(16),
    backgroundColor: '#DDDDDD',
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLengthReaction: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(10),
    marginLeft: scale(2),
  },
  txtMessage: {
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
    lineHeight: moderateScale(20),
  },
  txtCenter: {
    fontSize: moderateScale(10),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginVertical: verticalScale(8),
    textAlign: 'center',
  },
  viewReply: {
    flexDirection: 'row',
    marginBottom: verticalScale(5),
  },
  viewColumn: {
    width: 2,
    height: '100%',
    backgroundColor: 'green',
    marginRight: scale(6),
  },
  iconReply: {
    marginRight: 10,
    marginTop: 5,
  },
  txtReply: {},
  txtContentReply: {
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
    color: colors.backgroundTab,
    marginTop: verticalScale(8),
  },
  imageSmall: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  viewRowEdit: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  imageStampBig: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: scale(5),
  },
  txtNameFile: {
    fontSize: moderateScale(12),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginLeft: scale(5),
  },
  viewRowFile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtDateCenter: {
    fontSize: moderateScale(14),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginVertical: verticalScale(8),
    textAlign: 'center',
  },
  txtBold: {
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
  txtBoldAndBackGroundColor: {
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    backgroundColor: '#bbbbbb',
  },
  bottomMenu: {
    marginTop: verticalScale(-100),
  },
  viewSeenCurrent: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    alignItems: 'center',
  },
  viewSeen: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  imageStampRepLy: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginHorizontal: moderateScale(2),
  },
  senderInfo: {
    marginLeft: scale(34),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNameSend: {
    color: colors.border,
    fontSize: moderateScale(10),
    ...stylesCommon.fontWeight500,
  },
  viewTask: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtEdited: {
    color: colors.border,
    fontSize: moderateScale(10),
  },
  viewTimeEditRight: {
    marginTop: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTimeEditLeft: {
    marginTop: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(26) + scale(7),
  },
  iconEdit: {
    width: moderateScale(10),
    height: moderateScale(10),
  },
  containerMenuDelete: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewRedLine: {
    width: '100%',
    borderWidth: 0.5,
    marginVertical: moderateScale(20),
    borderColor: 'red',
  },
  txtRedLine: {
    color: 'red',
    fontSize: moderateScale(14),
    position: 'absolute',
    top: moderateScale(11),
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
    ...stylesCommon.fontWeight500,
  },
  decoContainer: {
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
    alignItems: 'center',
  },
  decoButton: {
    width: moderateScale(45),
    height: moderateScale(28),
    backgroundColor: colors.white,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 0,
    marginBottom: moderateVerticalScale(8),
    marginLeft: 5,
  },
  decoText: {
    color: '#444444',
    fontSize: moderateScale(14),
  },
  spaceName: {
    paddingLeft: scale(8),
  },
});

export {styles};
