import React from 'react';
import {View} from 'react-native';

import {AppButton} from '@component';

import {styles} from './stylesItem';

const decoButtonArr = [
  {
    text: 'タイトル',
    tag: 'title',
    width: 76,
  },
  {
    text: '囲み枠',
    tag: 'info',
    width: 68,
  },
  {
    text: '罫線',
    tag: 'hr',
  },
  {
    text: '太字',
    tag: 'bold',
  },
  {
    text: '赤字',
    tag: 'red',
  },
];

export type DecoButtonProps = {
  onDecoSelected: any;
};

export default function DecoButton({onDecoSelected}: DecoButtonProps) {
  return (
    <View style={styles.decoContainer}>
      {decoButtonArr.map(item => {
        return (
          <AppButton
            key={item.tag}
            title={item.text}
            onPress={() => onDecoSelected(item.tag)}
            styleButton={[
              styles.decoButton,
              item.width ? {width: item?.width} : '',
            ]}
            styleTitle={styles.decoText}
          />
        );
      })}
    </View>
  );
}
