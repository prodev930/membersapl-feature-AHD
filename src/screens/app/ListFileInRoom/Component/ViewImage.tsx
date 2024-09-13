import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {ItemImage} from './ItemImage';
import {getListImageInroom} from '@services';
import ImageView from 'react-native-image-viewing';
import {HITSLOP} from '@util';
import {iconDowload, iconClose} from '@images';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {showMessage} from 'react-native-flash-message';
import {GlobalService} from '@services';

const ViewImage = React.memo((props: any) => {
  const {id} = props;

  const [listImage, setListImage] = useState<any>([]);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(false);
  const [urlModalImage, setUrlModalImage] = useState<any>(0);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const renderImage = useCallback(() => {
    const result = listImage?.map((item: any) => {
      return {
        uri: item?.path,
      };
    });
    return result;
  }, [listImage]);

  useEffect(() => {
    const params = {
      id: id,
      page: page,
    };
    getData(params);
  }, [page]);

  const getData = async (params: any) => {
    try {
      const res = await getListImageInroom(params?.id, params?.page);
      setTotal(res?.data?.images?.total);
      setLastPage(res?.data?.images?.last_page);
      setListImage(
        params?.page === 1
          ? res?.data?.images?.data
          : listImage.concat(res?.data?.images?.data),
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

  const renderItem = ({item, index}: any) => (
    <ItemImage
      item={item}
      openFile={async () => {
        await setUrlModalImage(index);
        viewImage();
      }}
    />
  );

  const viewImage = useCallback(() => {
    setModalImage(!modalImage);
  }, [modalImage]);

  const onDowloadImage = useCallback(
    async imageIndex => {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      } else {
        await viewImage();
        GlobalService.showLoading();
        const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
        const url = encodeURI(listImage[imageIndex]?.path);
        const fileName = Date.now();
        const fileExtention = url.split('.').pop();
        const fileFullName = fileName + '.' + fileExtention;
        RNFetchBlob.config({
          fileCache: true,
          path: destinationPath + '/' + fileFullName,
        })
          .fetch('GET', url)
          .then(res => {
            CameraRoll.saveToCameraRoll(res?.path(), 'photo')
              .then(() => {
                GlobalService.hideLoading();
                showMessage({
                  message: 'ダウンロード成功',
                  type: 'success',
                });
              })
              .catch(err => {
                GlobalService.hideLoading();
                showMessage({
                  message: '処理中にエラーが発生しました',
                  type: 'danger',
                });
              });
          })
          .catch(error => {
            GlobalService.hideLoading();
            showMessage({
              message: '処理中にエラーが発生しました',
              type: 'danger',
            });
            Linking.openURL(url);
          });
      }
    },
    [modalImage, urlModalImage, listImage],
  );

  const renderHeader = useCallback(
    ({imageIndex}) => {
      return (
        <View style={styles.viewHeaderImage}>
          <TouchableOpacity
            hitSlop={HITSLOP}
            onPress={() => onDowloadImage(imageIndex)}>
            <Image source={iconDowload} style={styles.iconDowload} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={HITSLOP} onPress={viewImage}>
            <Image source={iconClose} style={styles.iconClose} />
          </TouchableOpacity>
        </View>
      );
    },
    [modalImage],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={listImage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        key={5}
        numColumns={5}
      />
      <ImageView
        images={renderImage()}
        imageIndex={urlModalImage}
        visible={modalImage}
        onRequestClose={viewImage}
        HeaderComponent={renderHeader}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(4),
  },
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  iconDowload: {
    tintColor: '#FFFFFF',
    width: 25,
    height: 25,
  },
  iconClose: {
    tintColor: '#FFFFFF',
  },
});

export {ViewImage};
