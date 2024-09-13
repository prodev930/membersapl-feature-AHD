import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Video from 'react-native-video';
import {
  iconPlay,
  iconPdf,
  iconDoc,
  iconXls,
  iconFile,
  iconDowload,
  iconClose,
} from '@images';
import {ModalReadFile} from '@component';
import {colors, stylesCommon} from '@stylesCommon';
import ImageView from 'react-native-image-viewing';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {HITSLOP} from '@util';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {showMessage} from 'react-native-flash-message';
import {GlobalService} from '@services';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {ATTACHMENT_FILE_TYPE} from '@util';

const LINK_URL_VIDEO = /^(http(s)?:\/\/|www\.).*(\.mp4|\.mkv|\.mov)$/i;

const MsgFile = React.memo((props: any) => {
  const {data} = props;
  const navigation = useNavigation<any>();
  const [modalImage, setModalImage] = useState(false);
  const [urlModalImage, setUrlModalImage] = useState<any>([]);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const [dataModalFile, setDataModalFile] = useState({
    show: false,
    path: null,
  });
  const openFile = (url: any) => {
    //Check link video và link web
    if (!LINK_URL_VIDEO?.test(url)) {
      setDataModalFile({
        show: true,
        path: url,
      });
    } else {
      navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {url: url});
    }
  };

  const onCloseModalFile = useCallback(() => {
    setDataModalFile({
      show: false,
      path: null,
    });
  }, []);

  const viewImage = useCallback(() => {
    setModalImage(!modalImage);
  }, [modalImage]);

  const onDowloadImage = useCallback(async () => {
    //Đây là logic của phần dowload image
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    } else {
      await viewImage();
      GlobalService.showLoading();
      //Chỉnh sửa đường dẫn (fix bug của bên android)
      const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
      const url = encodeURI(urlModalImage[0]?.uri);
      const fileName = Date.now();
      const fileExtention = url.split('.').pop();
      const fileFullName = fileName + '.' + fileExtention;
      RNFetchBlob.config({
        fileCache: true,
        path: destinationPath + '/' + fileFullName,
      })
        .fetch('GET', url)
        .then(res => {
          //Save ảnh vào thư mục của điện thoại
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
        });
    }
  }, [modalImage, urlModalImage]);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeaderImage}>
        <TouchableOpacity hitSlop={HITSLOP} onPress={onDowloadImage}>
          <Image source={iconDowload} style={styles.iconDowload} />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={HITSLOP} onPress={viewImage}>
          <Image source={iconClose} style={styles.iconClose} />
        </TouchableOpacity>
      </View>
    );
  }, [modalImage]);

  const Item = useCallback(
    ({item}: any) => {
      return (
        <>
          {item?.type == ATTACHMENT_FILE_TYPE.IMAGE && (
            <TouchableOpacity
              onPress={async () => {
                await setUrlModalImage([{uri: item?.path}]);
                viewImage();
              }}>
              <FastImage
                source={{
                  uri: item?.path,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {(item?.type == 7 ||
            item?.type == 1 ||
            item?.type == 6 ||
            item?.type == ATTACHMENT_FILE_TYPE.MOVIE) && (
            <TouchableOpacity
              style={styles.viewRow}
              onPress={() =>
                openFile(item?.path)
              }>
              <Image source={iconFile} style={styles.iconFile} />
              <Text style={styles.txtTitleFile} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
          {item?.type == ATTACHMENT_FILE_TYPE.PDF && (
            <TouchableOpacity
              style={styles.viewRow}
              onPress={() => openFile(item?.path)}>
              <Image source={iconPdf} style={styles.iconFile} />
              <Text style={styles.txtTitleFile} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
          {item?.type == ATTACHMENT_FILE_TYPE.DOC && (
            <TouchableOpacity
              style={styles.viewRow}
              onPress={() => openFile(item?.path)}>
              <Image source={iconDoc} style={styles.iconFile} />
              <Text style={styles.txtTitleFile} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
          {item?.type == ATTACHMENT_FILE_TYPE.XLS && (
            <TouchableOpacity
              style={styles.viewRow}
              onPress={() => openFile(item?.path)}>
              <Image source={iconXls} style={styles.iconFile} />
              <Text style={styles.txtTitleFile} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        </>
      );
    },
    [modalImage],
  );

  return (
    <>
      {data?.map((item: any, index: any) => {
        return <Item item={item} key={item?.id} />;
      })}
      <ImageView
        images={urlModalImage}
        imageIndex={0}
        visible={modalImage}
        onRequestClose={viewImage}
        HeaderComponent={renderHeader}
      />
      <ModalReadFile data={dataModalFile} onClose={onCloseModalFile} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    width: moderateScale(150),
    height: moderateScale(100),
    marginVertical: verticalScale(3),
    borderRadius: moderateScale(5),
  },
  iconPlay: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#FFFFFF',
  },
  viewIconPlay: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    position: 'absolute',
  },
  viewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  iconFile: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  txtTitleFile: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(12),
    marginLeft: scale(5),
    width: '80%',
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

export {MsgFile};
