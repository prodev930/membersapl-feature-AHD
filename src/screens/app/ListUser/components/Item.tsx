import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Menu} from 'react-native-material-menu';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import {UserAddition} from '@component';
import {defaultAvatar, iconPin, iconReload, iconRemove} from '@images';
import {colors, stylesCommon} from '@stylesCommon';

import {MenuOption} from './MenuOption';

const Item = React.memo((props: any) => {
  const {item, deleteUser, changeRole, showChange} = props;

  const [showPopup, setShowPopUp] = useState<boolean>(false);

  const renderViewRole = () => {
    switch (item?.is_admin) {
      case 1:
        return (
          <View style={[styles.viewRole, {backgroundColor: '#FDEEEA'}]}>
            <Text style={styles.txtContent}>マスター</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.viewRole}>
            <Text style={styles.txtContent}>メンバー</Text>
          </View>
        );
      default:
        return (
          <View style={styles.viewRole}>
            <Text style={styles.txtContent}>ゲスト</Text>
          </View>
        );
    }
  };

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
            {item?.login_status === 1 && (
              <View style={styles.viewActive}>
                <View style={styles.active} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.viewTxt}>
          <>
            {item?.id < 0 ? (
              <Text style={styles.txtTitle} numberOfLines={2}>
                {item?.name}
              </Text>
            ) : (
              <Text style={styles.txtTitle} numberOfLines={2}>
                {item?.last_name} {item?.first_name}
              </Text>
            )}

            {!!item?.addition && (
              <UserAddition
                content={item.addition}
                customStyle={styles.additionText}
              />
            )}
          </>

          {renderViewRole()}
        </View>
        {showChange === true && item?.id > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setShowPopUp(true);
            }}
            style={[styles.viewImageNext, {justifyContent: 'flex-end'}]}>
            <Image source={iconReload} style={styles.iconReload} />
            <Menu
              style={styles.containerMenuDelete}
              visible={showPopup}
              onRequestClose={() => setShowPopUp(false)}
              key={1}>
              <MenuOption
                title="マスタ"
                onClick={() => {
                  changeRole(1, item?.id);
                  setShowPopUp(false);
                }}
              />
              <MenuOption
                title="メンバー"
                onClick={() => {
                  changeRole(2, item?.id);
                  setShowPopUp(false);
                }}
              />
            </Menu>
          </TouchableOpacity>
        ) : (
          <View style={styles.viewImageNext} />
        )}
        {showChange === true ? (
          <TouchableOpacity
            onPress={() => {
              deleteUser(item);
            }}
            style={[
              styles.viewImageNext,
              {
                justifyContent:
                  item?.pin_flag == 1 ? 'space-between' : 'flex-end',
              },
            ]}>
            {item?.pin_flag == 1 && <Image source={iconPin} />}
            <Image source={iconRemove} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(14),
  },
  viewContent: {
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '57%',
    justifyContent: 'space-between',
  },
  viewImageNext: {
    width: '10%',
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
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: colors.secondPrimary,
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
  viewRole: {
    maxWidth: '45%',
    paddingHorizontal: scale(10),
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: '#E7F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconReload: {
    width: moderateVerticalScale(25),
    height: moderateVerticalScale(25),
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
  additionText: {
    fontSize: moderateScale(12),
  },
});

export {Item};
