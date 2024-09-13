import React, {useRef, useImperativeHandle} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';
import {iconTabChat} from '@images';
import {HITSLOP} from '@util';

interface inputType {
  value?: string;
  onChange?: any;
  placeholder?: string;
  styleContainer?: any;
  styleInput?: any;
  error?: any;
  icon?: any;
  styleIcon?: any;
  secureTextEntry?: boolean;
  multiline?: boolean;
  maxLength?: number;
  showObtion?: boolean;
  onShowOption?: any;
}

const AppInput = React.forwardRef((props: inputType, ref) => {
  const {
    value,
    onChange,
    placeholder,
    styleContainer,
    styleInput,
    error,
    icon,
    styleIcon,
    secureTextEntry,
    multiline,
    maxLength,
    showObtion,
    onShowOption,
  } = props;

  const refTextInput = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      focusInput,
    }),
    [],
  );

  const focusInput = () => {
    refTextInput?.current?.focus();
  };

  return (
    <View style={styles.view}>
      <View style={[styles.container, styleContainer]}>
        {icon && <Image source={icon} style={[styles.icon, styleIcon]} />}
        <TextInput
          ref={refTextInput}
          style={[styles.input, styleInput]}
          onChangeText={onChange ? onChange : () => {}}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
        />
        {showObtion ? (
          <TouchableOpacity hitSlop={HITSLOP} onPress={onShowOption}>
            <Image source={iconTabChat} style={styles.iconAction} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.txtTxtError}>{error}</Text> : <></>}
    </View>
  );
});

const styles = ScaledSheet.create({
  view: {
    width: '100%',
  },
  container: {
    marginBottom: '8@ms',
    width: '100%',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '16@s',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: '16@ms',
    ...stylesCommon.fontWeight500,
    paddingVertical: '13@vs',
    paddingRight: '13@s',
    flex: 1,
  },
  txtTxtError: {
    fontSize: '12@ms',
    ...stylesCommon.fontWeight500,
    marginBottom: '8@ms',
    color: 'red',
    textAlign: 'left',
  },
  icon: {
    marginRight: '9@s',
    tintColor: colors.border,
  },
  iconAction: {
    tintColor: colors.darkGrayText,
  },
});

export {AppInput};
