import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './style';
import {Header, AppInput} from '@component';
import {iconSearch} from '@images';
import {debounce} from 'lodash';
import {useSelector} from 'react-redux';
import {Item} from './component/Item';
import {
  getDetailChatApi,
  listBookmark,
  deleteBookmark,
  GlobalService,
} from '@services';
import {useDispatch} from 'react-redux';
import {fetchResultMessageAction} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';

const Bookmark = (props: any) => {
  const navigation = useNavigation<any>();
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const dispatch = useDispatch();
  const {route} = props;
  const [listMessage, setList] = useState([]);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);

  const callApiSearch = async (params: any) => {
    try {
      GlobalService.showLoading();
      const res = await listBookmark(params);
      setTotal(res?.data?.bookmark_messages?.paging?.total);
      setLastPage(res?.data?.bookmark_messages?.paging?.last_page);
      setList(
        params?.page === 1
          ? res?.data?.bookmark_messages?.data
          : listMessage.concat(res?.data?.bookmark_messages?.data),
      );
      GlobalService.hideLoading();
    } catch (error: any) {
      GlobalService.hideLoading();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const params = {
        page: 1,
        idCompany: idCompany,
      };
      callApiSearch(params);
    }, []),
  );

  useEffect(() => {
    if (page > 1) {
      const params = {
        page: page,
        idCompany: idCompany,
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
      idRoomChat: value?.room_id,
      idMessageSearchListChat: value?.id,
    });
  };

  const onDeleteItem = async (value: any) => {
    try {
      const res = await deleteBookmark(value?.id);
      const params = {
        page: 1,
        idCompany: idCompany,
      };
      callApiSearch(params);
      showMessage({
        message: res?.data?.message,
        type: 'success',
      });
    } catch (error: any) {}
  };

  const renderItem = ({item}: any) => (
    <Item
      item={item}
      onClickItem={() => onClickItem(item)}
      onDeleteItem={() => onDeleteItem(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="ブックマーク" back imageCenter />
      <View style={styles.viewContent}>
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

export {Bookmark};
