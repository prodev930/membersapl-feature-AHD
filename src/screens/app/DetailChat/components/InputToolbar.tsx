import React, {type Ref, type RefObject} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {moderateScale, scale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';
import {IS_IOS} from '@util';

import {
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from '../../../../lib/react-native-gifted-chat';
import {
  MIN_COMPOSER_HEIGHT,
  TOOLBAR_MIN_HEIGHT,
  calPositionButton,
} from '../styles';
import Composer, {type ComposerRef} from './Composer';

const MAX_INPUT_HEIGHT = 132;
const EMOJI_ICON_WIDTH = 18;

const getToolbarStyles = (isShowKeyboard: boolean) =>
  StyleSheet.create({
    toolBar: {
      borderTopWidth: 0,
      bottom: isShowKeyboard ? getBottomSpace() + (IS_IOS ? 6 : 1) : 0,
    },
    toolbarPrimaryStyles: {
      backgroundColor: '#F4F2EF',
      justifyContent: 'flex-end',
      paddingTop: 16,
      paddingBottom: isShowKeyboard ? 16 : 28,
    },
  });

export const renderInputToolbar = ({
  ref,
  isShowKeyboard,
  ...inputProps
}: Readonly<InputToolbarProps> &
  Readonly<{
    children?: React.ReactNode;
    isShowKeyboard: boolean;
    ref: RefObject<InputToolbar> | null;
  }>) => {
  const toolbarStyles = getToolbarStyles(isShowKeyboard);

  return (
    <InputToolbar
      {...inputProps}
      ref={ref}
      containerStyle={toolbarStyles.toolBar}
      primaryStyle={toolbarStyles.toolbarPrimaryStyles}
      accessoryStyle={styles.accessoryStyle}
    />
  );
};

const getComposerStyles = (
  minHeight: number,
  composerHeight: number,
  formattedText: (string | JSX.Element)[],
) => {
  const defaultPadding = (TOOLBAR_MIN_HEIGHT - minHeight) / 2;

  const getPaddingTop = () => {
    if (!minHeight) {
      return undefined;
    }

    return IS_IOS ? defaultPadding - 2 : defaultPadding;
  };

  const getPaddingBottom = () => {
    if (!minHeight) {
      return undefined;
    }

    return IS_IOS ? defaultPadding + 2 : defaultPadding;
  };

  return StyleSheet.create({
    composerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: getPaddingTop(),
      paddingBottom: getPaddingBottom(),
      borderRadius:
        composerHeight > MIN_COMPOSER_HEIGHT
          ? moderateScale(12)
          : moderateScale(21),
      minHeight: TOOLBAR_MIN_HEIGHT,
      position: 'relative',
      marginLeft: 13,
      ...(!formattedText?.length ? {maxHeight: TOOLBAR_MIN_HEIGHT} : {}),
    },
  });
};

export const renderComposer = ({
  toggleDecoButtons,
  formattedText,
  onInputTextChanged,
  showModalStamp,
  isShowModalStamp,
  textInputProps,
  composerHeight,
  setDefaultMinHeightInput,
  minHeightInput,
  composerRef,
  ...rest
}: ComposerProps & {
  toggleDecoButtons: () => void;
  isShowModalStamp: boolean;
  showModalStamp: () => void;
  formattedText: (string | JSX.Element)[];
  setDefaultMinHeightInput: (height: number) => void;
  minHeightInput: number;
  composerRef: Ref<ComposerRef>;
} & GiftedChatProps) => {
  const composerStyles = getComposerStyles(
    minHeightInput,
    composerHeight ?? 0,
    formattedText,
  );
  return (
    <View style={composerStyles.composerContainer}>
      <Composer
        {...rest}
        textInputStyle={styles.scrollMessage}
        textInputProps={{
          onLayout: e => setDefaultMinHeightInput(e.nativeEvent.layout.height),
          onChangeText: onInputTextChanged,
          onFocus: toggleDecoButtons,
          onBlur: toggleDecoButtons,
          children: <>{formattedText}</>,
          ...textInputProps,
        }}
        ref={composerRef}
      />
      <TouchableOpacity onPress={showModalStamp} style={styles.showStampButton}>
        <Image
          source={isShowModalStamp ? iconEmojiActive : iconEmoji}
          style={styles.iconEmojiStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    flex: 1,
  },
  accessoryStyle: {
    height: 'auto',
  },
  iconEmojiStyle: {
    width: EMOJI_ICON_WIDTH,
    height: EMOJI_ICON_WIDTH,
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: scale(10),
    bottom: 0,
    left: 0,
    right: 0,
  },
  showStampButton: {
    position: 'absolute',
    bottom: calPositionButton(EMOJI_ICON_WIDTH),
    right: 12,
  },
  scrollMessage: {
    maxHeight: MAX_INPUT_HEIGHT,
    lineHeight: 22,
    fontSize: 16,
    paddingLeft: 13,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 30,
    marginTop: 0,
    marginBottom: 0,
  },
});
