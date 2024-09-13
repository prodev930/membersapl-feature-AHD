import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {iconBack, iconBellSlash, logoImage} from '@images';
import {HITSLOP} from '@util';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  back?: any;
  customBack?: any;
  imageCenter?: any;
  sourceImageCenter?: any;
  onRightFirst?: any;
  onRightSecond?: any;
  iconRightFirst?: any;
  iconRightSecond?: any;
  styleIconRightSeccond?: any;
  styleIconRightFirst?: any;
  mute?: boolean;
}

const Header = React.memo((props: HeaderProps) => {
  const navigation = useNavigation<any>();
  const {
    back,
    customBack,
    imageCenter,
    sourceImageCenter,
    title,
    onRightFirst,
    onRightSecond,
    iconRightFirst,
    iconRightSecond,
    styleIconRightSeccond,
    styleIconRightFirst,
    mute,
  } = props;

  const onPressBack = useCallback(() => {
    if (customBack) {
      customBack();
    } else {
      navigation.goBack();
    }
  }, []);

  return (
    <LinearGradient
      colors={colors.colorGradient}
      style={styles.linearGradient}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}>
      <View style={styles.viewHeader}>
        <View style={styles.viewLeft}>
          {back && (
            <TouchableOpacity
              hitSlop={HITSLOP}
              style={styles.buttonBack}
              onPress={onPressBack}>
              <Image source={iconBack} style={styles.colorIcon} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewCenter}>
          {imageCenter && (
            <Image
              source={sourceImageCenter ? {uri: sourceImageCenter} : logoImage}
              style={
                sourceImageCenter ? styles.imageCenter : styles.marginRight
              }
            />
          )}
          <Text style={styles.txtTitle} numberOfLines={1}>
            {title}
          </Text>
          {mute && <Image source={iconBellSlash} style={styles.marginLeft} />}
        </View>
        <View style={styles.viewRight}>
          {onRightSecond && (
            <TouchableOpacity
              hitSlop={{...HITSLOP, right: 10}}
              style={styles.buttonRightSecond}
              onPress={onRightSecond}>
              <Image
                source={iconRightSecond}
                style={[styles.colorIcon, styleIconRightSeccond]}
              />
            </TouchableOpacity>
          )}
          {onRightFirst && (
            <TouchableOpacity
              hitSlop={{...HITSLOP, left: 0}}
              onPress={onRightFirst}
              activeOpacity={1}>
              <Image
                source={iconRightFirst}
                style={[styles.colorIcon, styleIconRightFirst]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  linearGradient: {
    paddingBottom: verticalScale(1),
  },
  viewHeader: {
    ...ifIphoneX(
      {
        paddingTop: verticalScale(40),
      },
      {
        paddingTop: getStatusBarHeight() + verticalScale(15),
      },
    ),
    paddingBottom: verticalScale(15),
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    backgroundColor: colors.background,
  },
  viewLeft: {
    width: '25%',
    justifyContent: 'center',
  },
  viewCenter: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBack: {
    width: 13,
  },
  txtTitle: {
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight600,
    color: colors.darkGrayText,
  },
  buttonRightSecond: {
    marginRight: scale(14),
  },
  imageCenter: {
    marginRight: scale(9),
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  colorIcon: {
    tintColor: colors.border,
  },
  marginRight: {
    marginRight: scale(9),
  },
  marginLeft: {
    marginLeft: scale(5),
  },
});

export {Header};
