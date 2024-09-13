import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  AppState,
  AppStateStatus,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat, iconFilterChat, iconNext} from '@images';
import {Item} from './component/Item';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
import {Menu} from 'react-native-material-menu';
import {MenuOption} from './component/MenuOption';
import {
  getRoomList,
  getUserInfo,
  saveIdRoomChat,
  saveMessageReply,
  resetDataChat,
  saveListUserChat,
  showHideModalFilterListChat,
  getUnreadMessageCount,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {ModalSearchMessage} from './component/ModalSearchMessage';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {AppNotification} from '@util';
import {colors} from '@stylesCommon';
import notifee from '@notifee/react-native';
import {FilterListChat} from '../FilterListChat';

const ListChat = (props: any) => {
  const refInput = useRef<any>(null);
  const {initFB} = AppNotification;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listRoom = useSelector((state: any) => state.chat.roomList);
  const paging = useSelector((state: any) => state.chat.pagingListRoom);
  const type_Filter = useSelector((state: any) => state.chat.type_Filter);
  const categoryID_Filter = useSelector(
    (state: any) => state.chat.categoryID_Filter,
  );
  const status_Filter = useSelector((state: any) => state.chat.status_Filter);
  const showModalFilter = useSelector(
    (state: any) => state.chat.modalFilterChat,
  );
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const user = useSelector((state: any) => state.auth.userInfo);
  const unReadMessageCount = useSelector(
    (state: any) => state.chat.unReadMessageCount,
  );
  const [key, setKey] = useState('');
  const [page, setPage] = useState(1);
  const [init, setInit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchMessage, setShowSearchMessage] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const {route} = props;

  useEffect(() => {
    if (init) {
      return;
    }
    setInit(true);
    initFB();
    if (user?.id) {
      dispatch(getUserInfo(user?.id));
      dispatch(showHideModalFilterListChat(false));
      dispatch(getUnreadMessageCount(user?.id)); // 全体未読チャット数取得
    }
  }, [dispatch, initFB, user, init]);

  const onRefresh = useCallback(() => {
    setPage(1);
    dispatch(
      getRoomList({
        key: key,
        company_id: idCompany,
        page: 1,
        type: type_Filter,
        category_id: categoryID_Filter,
      }),
    );
    dispatch(getUnreadMessageCount(user?.id)); // 全体未読チャット数取得
  }, [key, idCompany, type_Filter, categoryID_Filter, user, dispatch]);

  //個別チャットから一覧に戻った時に発火
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(saveIdRoomChat(null));
        await dispatch(saveMessageReply(null));
        await dispatch(resetDataChat());
        await dispatch(saveListUserChat([]));
        setPage(1);
        // 検索文字列入力時の遅延リクエストとkey変更検知による多重リクエスト対策
        debounceText(key);
      })();
    }, [type_Filter, categoryID_Filter, dispatch, idCompany, key]),
  );

  useEffect(() => {
    setIsLoadMore(false);
  }, [listRoom]);

  // これは、未読メッセージの合計をリッスンする論理関数です。結果がある場合は、バッジ通知をリセットします
  useEffect(() => {
    if (unReadMessageCount > 0) {
      notifee.setBadgeCount(unReadMessageCount);
    } else {
      notifee.setBadgeCount(0);
    }
  }, [unReadMessageCount]);

  useEffect(() => {
    try {
      if (page > 1) {
        dispatch(
          getRoomList({
            key: key,
            company_id: idCompany,
            page: page,
            type: type_Filter,
            category_id: categoryID_Filter,
          }),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [page]);

  const debounceText = useCallback(
    debounce(
      text =>
        dispatch(
          getRoomList({
            key: text,
            company_id: idCompany,
            page: page,
            type: type_Filter,
            category_id: categoryID_Filter,
          }),
        ),
      250,
    ),
    [categoryID_Filter, dispatch, idCompany, page, type_Filter],
  );

  const onChangeText = (text: any) => {
    setKey(text);
    debounceText(text);
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Item item={item} index={index} idRoomChat={route?.params?.idRoomChat} />
    );
  };

  const onCreate = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_ROOM_CHAT, {typeScreen: 'CREATE'});
  }, [navigation]);

  const handleLoadMore = () => {
    if (page === paging?.last_page) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  const onShowOption = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const onSearchRoom = useCallback(() => {
    setShowMenu(false);
    setTimeout(() => {
      refInput?.current?.focusInput();
    }, 500);
  }, []);

  const onSearchMessage = useCallback(() => {
    setShowMenu(false);
    setTimeout(() => {
      setShowSearchMessage(true);
    }, 500);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowSearchMessage(!showSearchMessage);
  }, [showSearchMessage]);

  return (
    <View style={styles.container}>
      <Header
        title="チャットグループ一覧"
        imageCenter
        onRightFirst={onCreate}
        iconRightFirst={iconAddListChat}
        styleIconRightFirst={styles.colorIcon}
      />
      <View style={styles.viewContent}>
        <AppInput
          ref={refInput}
          placeholder="グループ名、メッセージ内容を検索"
          onChange={onChangeText}
          value={key}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
          showObtion={true}
          onShowOption={onShowOption}
        />
        {/* Popup điều hướng khi chọn search tin nhắn hoặc tên phòng */}
        <View style={styles.viewOption}>
          <Menu
            style={styles.containerMenu}
            visible={showMenu}
            onRequestClose={onShowOption}
            key={1}>
            <MenuOption
              onSearchRoom={onSearchRoom}
              onSearchMessage={onSearchMessage}
            />
          </Menu>
        </View>
        <TouchableOpacity
          style={styles.viewFilter}
          onPress={() => {
            dispatch(showHideModalFilterListChat(true));
          }}>
          <View style={styles.viewCenter}>
            <Image source={iconFilterChat} />
            <Text style={styles.txtTitle}>
              {status_Filter?.length > 0 ? status_Filter : 'すべてのチャット'}
            </Text>
          </View>
          <Image source={iconNext} style={{transform: [{rotate: '90deg'}]}} />
        </TouchableOpacity>
        <FlatList
          data={listRoom}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!isLoadMore) {
              handleLoadMore();
            }
          }}
          ListFooterComponent={
            <>
              {isLoadMore === true ? (
                <View style={styles.viewLoadmore}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              ) : null}
            </>
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      </View>
      <FilterListChat
        visible={showModalFilter}
        closeModal={() => {
          dispatch(showHideModalFilterListChat(false));
        }}
      />
      <ModalSearchMessage
        visible={showSearchMessage}
        onClose={onCloseModal}
        keySearch={key}
      />
    </View>
  );
};

export {ListChat};
