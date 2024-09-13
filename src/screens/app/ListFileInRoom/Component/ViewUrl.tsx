import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {ItemUrl} from './ItemUrl';
import {getListLinkInRoom} from '@services';
import {useDispatch} from 'react-redux';
import {fetchResultMessageActionListFile} from '@redux';

const ViewUrl = (props: any) => {
  const {id} = props;
  const dispatch = useDispatch();
  const [listLink, setListLink] = useState([]);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);

  const getData = async (params: any) => {
    try {
      const res = await getListLinkInRoom(params?.id, params?.page);
      setTotal(res?.data?.links?.paging?.total);
      setLastPage(res?.data?.links?.paging?.last_page);
      setListLink(
        params?.page === 1
          ? res?.data?.links?.data
          : listLink.concat(res?.data?.links?.data),
      );
    } catch {}
  };

  const handleLoadMore = useCallback(() => {
    if (page !== lastPage) {
      setPage(prevPage => prevPage + 1);
    } else {
      null;
    }
  }, [page, lastPage]);

  useEffect(() => {
    const params = {
      id: id,
      page: page,
    };
    getData(params);
  }, [page]);

  const openFile = (item: any) => {
    // if (!LINK_URL_VIDEO?.test(url)) {
    //   setDataModalFile({
    //     show: true,
    //     path: url,
    //   });
    // } else {
    //   navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {url: url});
    // }
    const body = {
      id_room: id,
      id_message: item?.id,
    };
    dispatch(fetchResultMessageActionListFile(body));
  };

  const renderItem = ({item}: any) => (
    <ItemUrl
      item={item}
      openFile={() => {
        openFile(item);
      }}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={listLink}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

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
});

export {ViewUrl};
