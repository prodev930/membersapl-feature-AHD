import React from 'react';
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {colors} from '@stylesCommon';

const UserAddition = ({
  customStyle,
  content,
}: {
  customStyle?: StyleProp<TextStyle>;
  content: string;
} & TextProps) => {
  return (
    <Text
      numberOfLines={1}
      style={[styles.txtAddition, customStyle]}
      ellipsizeMode="tail">
      {content}
    </Text>
  );
};

export {UserAddition};

const styles = StyleSheet.create({
  txtAddition: {
    fontSize: moderateScale(9),
    letterSpacing: -0.18,
    color: colors.border,
  },
});
