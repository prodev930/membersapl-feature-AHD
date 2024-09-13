import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewHeader} from './ViewHeader';
import {ViewItem} from './ViewItem';
import {useDispatch} from 'react-redux';
import {saveStatusFilter} from '@redux';

const ViewFilter = React.memo((props: any) => {
  const dispatch = useDispatch();
  const {onClick} = props;
  return (
    <View style={styles.container}>
      <ViewItem
        title="すべてのチャット"
        onPress={() => {
          onClick(0);
          dispatch(saveStatusFilter('すべてのチャット'));
        }}
      />
      <ViewItem
        title="未読があるチャット"
        onPress={() => {
          onClick(2);
          dispatch(saveStatusFilter('未読があるチャット'));
        }}
      />
      <ViewItem
        title="メンションがあるチャット"
        onPress={() => {
          onClick(1);
          dispatch(saveStatusFilter('メンションがあるチャット'));
        }}
      />
      <ViewItem
        title="ミュート中のチャット"
        hideBorder={true}
        onPress={() => {
          onClick(3);
          dispatch(saveStatusFilter('ミュート中のチャット'));
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    borderRadius: 10,
  },
});

export {ViewFilter};
