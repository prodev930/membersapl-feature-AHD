import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {iconRemove, defaultAvatar, iconPin} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import moment from 'moment';

const Item = React.memo((props: any) => {
  const navigation = useNavigation<any>();
  const {item, deleteUser} = props;

  const string_date = `${moment(item?.last_check_date).format(
    'YYYY',
  )}年${moment(item?.last_check_date).format('MM')}月${moment(
    item?.last_check_date,
  ).format('DD')}日 ${moment(item?.last_check_date).format('HH:mm')}`;

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <View style={styles.image}>
            <Image
              source={
                item?.icon_image ? {uri: item?.icon_image} : defaultAvatar
              }
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.viewTxt}>
          <>
            <Text style={styles.txtTitle} numberOfLines={2}>
              {item?.last_name} {item?.first_name}
            </Text>
          </>
          <>
            <Text style={styles.txtTitleDate} numberOfLines={2}>
              閲覧: {'\n'}{' '}
              <Text style={{color: colors.primary}}>{string_date}</Text>
            </Text>
          </>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(16),
  },
  viewContent: {
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewImageNext: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtContent: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.border,
  },
  txtTitle: {
    maxWidth: '40%',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    color: colors.backgroundTab,
  },
  txtTitleDate: {
    maxWidth: '60%',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
  },
  image: {
    width: moderateScale(51),
    height: moderateScale(51),
    borderRadius: moderateScale(51 / 2),
  },
  viewActive: {
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(14 / 2),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  active: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12 / 2),
    backgroundColor: colors.active,
  },
});

export {Item};
