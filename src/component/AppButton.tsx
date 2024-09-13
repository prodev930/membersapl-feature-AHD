import React, {useCallback} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {debounce} from 'lodash';
import {colors, stylesCommon} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';

interface buttonType {
  title?: string;
  styleButton?: any;
  styleTitle?: any;
  onPress?: () => void;
  disabled?: boolean;
}

const AppButton = React.memo((props: buttonType) => {
  const {title, styleButton, styleTitle, onPress, disabled} = props;

  const onPressButton = useCallback(
    //Disble double click
    debounce(() => {
      if (onPress) {
        onPress();
      }
    }, 300),
    [onPress],
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: disabled ? '#595757' : colors.primary},
        styleButton,
      ]}
      onPress={onPressButton}
      disabled={disabled}>
      <Text style={[styles.titleButton, styleTitle]}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingVertical: '13@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@ms',
  },
  titleButton: {
    fontSize: '16@ms',
    color: '#FFFFFF',
    ...stylesCommon.fontWeight500,
  },
});

export {AppButton};
