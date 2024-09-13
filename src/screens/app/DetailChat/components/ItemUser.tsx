import React, {useCallback, useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import { defaultAvatar } from "@images";
import { useSelector } from "react-redux";

const ItemUser = React.memo((props: any) => {
  const {item, setShowTaskForm, setShowUserList, setSelected} = props;
  const loginUser = useSelector((state: any) => state.auth.userInfo);
  const showTaskForm = () => {
    setSelected([item.value]);
    setShowUserList(false);
    setShowTaskForm(true);
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} onPress={() => showTaskForm()}>
          <View style={styles.viewTxt}>
            <>
              {item?.icon_image ? (
                <Image
                  source={{uri: item?.icon_image}}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <Image source={defaultAvatar} style={styles.avatar} />
              )}
              <Text style={styles.txtContent} numberOfLines={1}>
                {item?.label}
              </Text>
            </>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {},
  viewContent: {
    paddingBottom: verticalScale(12),
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  txtContent: {
    fontSize: moderateScale(13),
    marginVertical: verticalScale(5),
    color: '#000000',
    backgroundColor: '#ffffff',
    marginLeft: moderateScale(5),
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
  image: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  viewDelete: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageDelete: {
    tintColor: 'red',
  },
  viewFinish: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonFinish: {
    width: '80%',
    paddingVertical: moderateScale(10),
    borderRadius: verticalScale(10) / 2,
  },
  buttonFinishTitle: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: verticalScale(35),
    alignItems: 'center',
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  rowCreatedUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 46,
    paddingLeft: 5,
    paddingRight: 18,
    alignItems: 'center',
  },
  childContainer: {
    width: '100%',
  },
  avatar: {
    width: verticalScale(30),
    height: verticalScale(30),
    borderRadius: verticalScale(20) / 2,
  },
  textTitleInput: {
    color: colors.black,
    fontSize: moderateScale(11),
    ...stylesCommon.fontWeight600,
    marginTop: 15,
    marginBottom: 10,
  },
  textContentInput: {
    paddingLeft: scale(10),
    color: '#000000',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
  },
  icon: {
    tintColor: colors.border,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export {ItemUser};
