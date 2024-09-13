import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {Header, ModalConfirm} from '@component';
import {
  defaultAvatar,
  iconCamera,
  iconCompany,
  iconDelete,
  iconEdit,
  iconEmail,
  iconPassword,
} from '@images';
import {getUserInfo, logOut, saveInfoUser} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {deleteImageUser, GlobalService, updateImageProfile} from '@services';
import {colors} from '@stylesCommon';

import {ViewItem} from './components/ViewItem';
import {styles} from './styles';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const navigation = useNavigation<any>();
  const [modal, setModal] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onLogout = useCallback(() => {
    onCancelModal();
    dispatch(logOut());
  }, [modal]);

  const uploadImageApi = async () => {
    try {
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? image?.path.replace('file://', '')
            : image?.path,
        type: 'image/jpeg',
        name: image?.filename ? image?.filename : image?.path,
      };
      data.append('file', imageUpload);
      const res = await updateImageProfile(data);
      await showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      await dispatch(saveInfoUser(res?.data?.user_info));
      setImage(null);
    } catch (error) {}
  };

  useEffect(() => {
    if (image) {
      uploadImageApi();
    }
  }, [image]);

  const upLoadImage = () => {
    ImagePicker.openPicker({
      cropping: false,
      width: verticalScale(126),
      height: verticalScale(126),
    })
      .then(async (image: any) => {
        setImage(image);
      })
      .catch(err => {});
  };

  const deleteAvatar = useCallback(async () => {
    try {
      GlobalService.showLoading();
      const res = await deleteImageUser();
      await showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      dispatch(getUserInfo(user?.id));
      GlobalService.hideLoading();
    } catch (error: any) {
      GlobalService.hideLoading();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header title="個人設定" imageCenter />
      <View style={styles.container}>
        <ScrollView alwaysBounceVertical={false}>
          <LinearGradient
            colors={['#1AA1AA', '#989898']}
            style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              {user?.icon_image ? (
                <Image
                  source={{uri: user?.icon_image}}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <Image source={defaultAvatar} style={styles.avatar} />
              )}
              <TouchableOpacity
                style={styles.buttonCamera}
                onPress={upLoadImage}>
                <Image
                  source={iconCamera}
                  style={{tintColor: colors.darkGrayText}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={deleteAvatar}>
                <Image
                  source={iconDelete}
                  style={{tintColor: colors.darkGrayText}}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <ViewItem
            sourceImage={iconEdit}
            title="表示名・補足情報"
            content={`${user?.last_name} ${user?.first_name}`}
            onPress={() => {
              navigation.navigate(ROUTE_NAME.EDIT_USER, {type: 'Name'});
            }}
          />
          <ViewItem
            sourceImage={iconEmail}
            title="メールアドレス "
            content={user?.mail}
            onPress={() => {
              navigation.navigate(ROUTE_NAME.EDIT_USER, {type: 'Email'});
            }}
          />
          <ViewItem
            sourceImage={iconPassword}
            title="パスワード"
            content="*******"
            onPress={() => {
              navigation.navigate(ROUTE_NAME.CHANGE_PASSWORD);
            }}
          />
          <ViewItem
            sourceImage={iconCompany}
            title="クライアント選択"
            onPress={() => {
              navigation.navigate(ROUTE_NAME.SETTING_COMPANY);
            }}
            hideBorder
          />
        </ScrollView>
      </View>
      <ModalConfirm
        visible={modal}
        onCancel={onCancelModal}
        titleHeader="本当にログアウトしますか？"
        onConfirm={onLogout}
      />
    </View>
  );
};

export {User};
