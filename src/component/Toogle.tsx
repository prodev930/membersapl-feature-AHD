import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import SwitchToggle from 'react-native-switch-toggle';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

interface ToogleProp {
  title?: string;
  title2?: string;
  customStyle?: any;
  status: boolean;
  onChange: () => void;
}

const Toggle = React.memo((prop: ToogleProp) => {
  const {title, customStyle, status, onChange, title2} = prop;
  return (
    <View style={[styles.container, customStyle]}>
      <View style={{maxWidth: '80%'}}>
        <Text style={styles.txtTitle}>{title}</Text>
        {title2 ? <Text style={styles.txtTitle2}>{title2}</Text> : null}
      </View>
      <SwitchToggle
        switchOn={status}
        onPress={onChange}
        containerStyle={styles.containerToogle}
        circleStyle={styles.cricle}
        circleColorOn="#FFFFFF"
        circleColorOff="#FFFFFF"
        backgroundColorOff="#CDCCD2"
        backgroundColorOn="#47CB84"
        duration={300}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    color: colors.darkGrayText,
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight600,
  },
  txtTitle2: {
    color: '#696969CC',
    fontSize: moderateScale(13),
    ...stylesCommon.fontWeight500,
    marginTop: 8,
  },
  containerToogle: {
    width: scale(40),
    height: scale(23),
    borderRadius: scale(25),
    padding: scale(5),
  },
  cricle: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: '#FFFFFF',
  },
});

export {Toggle};
