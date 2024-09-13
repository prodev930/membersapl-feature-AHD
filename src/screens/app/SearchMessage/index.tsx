import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './style';
import {Header, AppInput} from '@component';
import {iconSearch} from '@images';
import {debounce} from 'lodash';
import {Item} from './component/Item';
import {getDetailChatApi} from '@services';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';

const SearchMessage = (props: any) => {
  const {route} = props;
  const {idRoomChat} = route?.params;
  const [key, setKey] = useState<string>('');
  const [listMessage, setList] = useState([]);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<any>();

  const callApiSearch = useCallback(
    async (params: any) => {
      try {
        if (params?.key?.length > 0) {
          const res = await getDetailChatApi(params);
          setTotal(res?.data?.room_messages?.paging?.total);
          setLastPage(res?.data?.room_messages?.paging?.last_page);
          setList(
            params?.page === 1
              ? res?.data?.room_messages?.data
              : listMessage.concat(res?.data?.room_messages?.data),
          );
        } else {
          setLastPage(null);
          setList([]);
          setPage(1);
          setTotal(null);
        }
      } catch (error: any) {}
    },
    [listMessage],
  );

  const debounceText = debounce((text: string) => {
    setPage(1);
    const params = {
      id: idRoomChat,
      page: 1,
      key: text,
    };
    callApiSearch(params);
  });

  const onChangeText = useCallback(
    (text: string) => {
      setKey(text);
      debounceText(text);
    },
    [debounceText],
  );

  useEffect(() => {
    if (page > 1) {
      const params = {
        id: idRoomChat,
        page: page,
        key: key,
      };
      callApiSearch(params);
    }
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (page !== lastPage) {
      setPage(prevPage => prevPage + 1);
    } else {
      null;
    }
  }, [page, lastPage]);

  const onClickItem = (value: any) => {
    navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {
      idRoomChat: idRoomChat,
      idMessageSearchListChat: value?.id,
    });
  };

  const renderItem = ({item}: any) => (
    <Item item={item} onClickItem={() => onClickItem(item)} />
  );

  return (
    <View style={styles.container}>
      <Header title="メッセージ検索" back imageCenter />
      <View style={styles.viewContent}>
        <AppInput
          placeholder="メッセージ内容を検索"
          onChange={onChangeText}
          value={key}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
        />
        {total ? (
          <View style={styles.viewRow}>
            <Text style={styles.txtTitleTotal}>結果: </Text>
            <Text style={styles.txtTotal}>{total} メッセージ</Text>
          </View>
        ) : null}
        <FlatList
          data={listMessage}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
};

export {SearchMessage};
