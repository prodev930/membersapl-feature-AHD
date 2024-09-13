import React, {useState} from 'react';
import {View} from 'react-native';
import {Header, Toggle} from '@component';
import {styles} from './styles';
import {updateMuteFlag} from '@services';
import {useDispatch} from 'react-redux';
import {updateMuteStatusRoom} from '@redux';

const MuteSetting = (props: any) => {
  const dispatch = useDispatch();
  const {route} = props;
  const {roomDetail} = route?.params;

  const [mute, setMute] = useState(roomDetail?.mute_flag === 1 ? true : false);

  const handleMuteSetting = async () => {
    try {
      const body = {
        room_id: roomDetail?.id,
        status: mute ? 0 : 1,
      };
      await updateMuteFlag(body);
      dispatch(updateMuteStatusRoom(!mute));
      setMute(!mute);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error?.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title={roomDetail.name} imageCenter back mute={mute} />
      <View style={styles.viewContent}>
        <View style={styles.item}>
          <Toggle
            title="このチャットグループをミュートする"
            status={mute}
            onChange={handleMuteSetting}
          />
        </View>
      </View>
    </View>
  );
};

export {MuteSetting};
