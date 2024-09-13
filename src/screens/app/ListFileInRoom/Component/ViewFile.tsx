import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {ItemFile} from './ItemFile';
import {getListFileInroom} from '@services';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {ModalReadFile} from '@component';
import {useDispatch} from 'react-redux';
import {fetchResultMessageActionListFile} from '@redux';

const LINK_URL_VIDEO = /^(http(s)?:\/\/|www\.).*(\.mp4|\.mkv|\.mov)$/i;

const ViewFile = React.memo((props: any) => {
  const {id} = props;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [listFile, setListFile] = useState([]);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);
  const [dataModalFile, setDataModalFile] = useState({
    show: false,
    path: '',
  });

  const getData = async (params: any) => {
    try {
      const res = await getListFileInroom(params?.id, params?.page);
      setTotal(res?.data?.files?.total);
      setLastPage(res?.data?.files?.last_page);
      setListFile(
        params?.page === 1
          ? res?.data?.files?.data
          : listFile.concat(res?.data?.files?.data),
      );
    } catch {}
  };

  useEffect(() => {
    const params = {
      id: id,
      page: page,
    };
    getData(params);
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (page !== lastPage) {
      setPage(prevPage => prevPage + 1);
    } else {
      null;
    }
  }, [page, lastPage]);

  const openFile = (item: any) => {
    // const body = {
    //   id_room: id,
    //   id_message: item?.messages_id,
    // };
    // dispatch(fetchResultMessageActionListFile(body));
    if (!LINK_URL_VIDEO?.test(item?.path)) {
      setDataModalFile({
        show: true,
        path: item?.path,
      });
    } else {
      navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {url: item?.path});
    }
  };

  const onCloseModalFile = useCallback(() => {
    setDataModalFile({
      show: false,
      path: '',
    });
  }, []);

  const renderItem = ({item}: any) => (
    <ItemFile
      item={item}
      openFile={() => {
        openFile(item);
      }}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={listFile}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        keyExtractor={(item, index) => index.toString()}
      />
      <ModalReadFile data={dataModalFile} onClose={onCloseModalFile} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
  // centerRow: {justifyContent: ''},
});

export {ViewFile};
