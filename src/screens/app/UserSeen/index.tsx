import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './style';
import { Header } from '@component';
import { getListUserSeen } from '@services';
import { Item } from './component/Item';

const UserSeen = (props: any) => {
  const { route } = props;
  const { id } = route.params;

  const [stateButton, setState] = useState(1);
  const [listUserSeen, setListUserSeen] = useState([]);
  const [listUserNotSeen, setListUserNotSeen] = useState([]);
  const [data, setData] = useState([]);

  const onChangeState = useCallback(() => {
    if (stateButton === 1) {
      setState(2);
    } else {
      setState(1);
    }
  }, [stateButton]);

  const getListUser = async () => {
    try {
      const res = await getListUserSeen(id);
      setListUserSeen(res?.data?.data?.users_seen);
      setListUserNotSeen(res?.data?.data?.users_not_seen);
      setData(res?.data?.data?.users_seen);
    } catch (error: any) { }
  };

  useEffect(() => {
    getListUser();
  }, []);

  useEffect(() => {
    if (stateButton === 1) {
      setData(listUserSeen);
    } else {
      setData(listUserNotSeen);
    }
  }, [stateButton, listUserSeen, listUserNotSeen]);

  const renderItem = ({ item }: any) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <Header title="ユーザーのリスト" back imageCenter />
      <View style={styles.viewButtonTop}>
        <TouchableOpacity style={styles.button} onPress={onChangeState}>
          <Text
            style={[
              stateButton === 1
                ? styles.styleTxtButtonActive
                : styles.styleTxtButton,
            ]}>
            閲覧したユーザー
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onChangeState}>
          <Text
            style={[
              stateButton === 2
                ? styles.styleTxtButtonActive
                : styles.styleTxtButton,
            ]}>
            閲覧していないユーザー
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export { UserSeen };
