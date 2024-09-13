import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import {HITSLOP} from '@util';
import {iconDowload, iconClose} from '@images';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import MediaControls from 'react-native-media-controls';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {showMessage} from 'react-native-flash-message';
import {GlobalService} from '@services';

const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2,
};

const DetailVideo = (props: any) => {
  const videoPlayer = useRef<any>(null);
  const {route} = props;
  const {url} = route?.params;
  const navigation = useNavigation<any>();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);

  const goBack = useCallback(() => {
    setPlayerState(PLAYER_STATES.ENDED);
    navigation.goBack();
  }, []);

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: any) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data: any) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const onDowload = async () => {
    //Đây là logic của phần dowload video
    await setPaused(true);
    await setPlayerState(PLAYER_STATES.PAUSED);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    GlobalService.showLoading();
    //Convert đường dẫn của android (fix bug android)
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
    const fileName = Date.now();
    const fileExtention = url.split('.').pop();
    const fileFullName = fileName + '.' + fileExtention;
    RNFetchBlob.config({
      fileCache: true,
      path: destinationPath + '/' + fileFullName,
    })
      .fetch('GET', encodeURI(url))
      .then(res => {
        //Save video vào thư mục trong điện thoại
        CameraRoll.saveToCameraRoll(res?.path(), 'video')
          .then(() => {
            GlobalService.hideLoading();
            showMessage({
              message: 'ダウンロード成功',
              type: 'success',
              position: 'bottom',
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
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: encodeURI(url)}}
        style={styles.video}
        resizeMode="contain"
        ref={videoPlayer}
        onEnd={onEnd}
        onLoad={onLoad}
        //@ts-ignore
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        volume={10}
        ignoreSilentSwitch="ignore"
      />

      {/* @ts-ignore */}
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
      />

      <View style={styles.viewHeaderImage}>
        <TouchableOpacity hitSlop={HITSLOP} onPress={goBack}>
          <Image source={iconClose} style={styles.iconClose} />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={HITSLOP} onPress={onDowload}>
          <Image source={iconDowload} style={styles.iconDowload} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    alignItems: 'center',
    position: 'absolute',
    top: getStatusBarHeight(),
  },
  iconDowload: {
    tintColor: '#FFFFFF',
    width: 25,
    height: 25,
  },
  iconClose: {
    tintColor: '#FFFFFF',
  },
  video: {
    flex: 1,
  },
});

export {DetailVideo};
