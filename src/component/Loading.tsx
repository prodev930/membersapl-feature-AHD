import {colors} from '@stylesCommon';
import React from 'react';
import {ViewProps, View, StyleSheet, ActivityIndicator} from 'react-native';

export interface Loading extends ViewProps {
  isLoading: boolean;
  color?: string;
  mini?: boolean;
  borderRadius?: number;
}

export const Loading: React.FC<Loading> = React.memo(props => {
  let {
    isLoading,
    color = colors.primary,
    mini = false,
    borderRadius = 0,
    style,
  } = props;
  if (isLoading) {
    return (
      <View style={[styles.container, {borderRadius: borderRadius}, style]}>
        <View
          style={[
            styles.background,
            mini ? {backgroundColor: 'transparent'} : {},
          ]}>
          <ActivityIndicator color={mini ? '#fff' : color} />
        </View>
      </View>
    );
  } else {
    return null;
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(51,51,51,0.5)',
    zIndex: 99,
  },
  background: {
    height: 60,
    width: 60,
    borderRadius: 3,
    backgroundColor: 'rgba(214, 214, 229, 0.87)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});
