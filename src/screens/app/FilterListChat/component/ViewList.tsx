import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ViewHeader} from './ViewHeader';
import {ViewItem} from './ViewItem';
import {useDispatch} from 'react-redux';
import {saveStatusFilter} from '@redux';

const ViewList = React.memo((props: any) => {
  const dispatch = useDispatch();
  const {onPressAdd, list, onPress, onEdit, onDelete, loading} = props;

  const renderItem = ({item, index}: any) => {
    return (
      <ViewItem
        title={item?.name}
        hideBorder={true}
        isListEdit
        onPress={() => {
          onPress(item);
          dispatch(saveStatusFilter(item?.name))
        }}
        onEdit={() => {
          onEdit(item);
        }}
        onDelete={() => {
          onDelete(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ViewHeader title="カテゴリ" onPressAdd={onPressAdd} />
      {loading === false ? (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.viewLoading}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginVertical: 2,
    borderRadius: 10,
    maxHeight: '65%',
  },
  viewLoading: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export {ViewList};
