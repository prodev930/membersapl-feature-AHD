import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TextInput, type NativeSyntheticEvent} from 'react-native';
import type {ComposerProps} from '../../../../lib/react-native-gifted-chat/lib';
import Color from '../../../../lib/react-native-gifted-chat/lib/Color';

export type ComposerRef = {
  onUnFocus: () => void;
  isFocused: boolean;
};

const Composer = forwardRef<ComposerRef, ComposerProps>(
  (
    {
      placeholderTextColor = Color.defaultColor,
      textInputProps = {},
      onTextChanged,
      onInputSizeChanged,
      disableComposer = false,
      textInputStyle = {},
      textInputAutoFocus = false,
      keyboardAppearance = 'default',
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput | null>(null);

    useImperativeHandle(ref, () => ({
      onUnFocus,
      isFocused: inputRef.current?.isFocused() ?? false,
    }));

    const [currentContentSize, setCurrentContentSize] = useState<
      {width: number; height: number} | undefined
    >();

    const handleContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<any>) => {
        const {contentSize} = e.nativeEvent;

        // Support earlier versions of React Native on Android
        if (!contentSize) {
          return;
        }

        if (
          !currentContentSize ||
          (currentContentSize &&
            (currentContentSize.width !== contentSize.width ||
              currentContentSize.height !== contentSize.height))
        ) {
          setCurrentContentSize(contentSize);
          onInputSizeChanged?.(contentSize);
        }
      },
      [currentContentSize, onInputSizeChanged],
    );

    const handleChangeText = useCallback(
      (textChange: string) => {
        onTextChanged?.(textChange);
      },
      [onTextChanged],
    );

    const onUnFocus = useCallback(() => {
      inputRef.current?.blur?.();
    }, []);

    return (
      <TextInput
        accessible
        accessibilityLabel="メッセージ"
        placeholder="メッセージ"
        placeholderTextColor={placeholderTextColor}
        multiline
        editable={!disableComposer}
        onChange={handleContentSizeChange}
        onContentSizeChange={handleContentSizeChange}
        onChangeText={handleChangeText}
        style={[styles.textInput, textInputStyle]}
        autoFocus={textInputAutoFocus}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        keyboardAppearance={keyboardAppearance}
        textAlignVertical="center"
        value={undefined}
        {...textInputProps}
        ref={inputRef}
      />
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 'auto',
  },
});

export default memo(Composer);
