import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Header} from '@component';
import {styles} from './styles';
import {Toggle} from '@component';
import {useSelector, useDispatch} from 'react-redux';
import {configNoti} from '@services';
import {getUserInfo} from '@redux';

const ConfigNoti = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state?.auth?.userInfo?.notificaiton_setting,
  );
  const useId = useSelector((state: any) => state?.auth?.userInfo?.id);

  const [state1, setState1] = useState(user?.show_message_flag == 0 ? false : true);
  const [state2, setState2] = useState(
    user?.mention_flag == 0 ? false : true,
  );

  const mentionFlag = async () => {
    try {
      let params = {
        status: state1 === true ? 0 : 1,
        type: 1,
      };
      const res = await configNoti(params);
      dispatch(getUserInfo(useId));
      setState1(!state1);
    } catch (error) {}
  };

  const showMessage = async () => {
    try {
      let params = {
        status: state2 === true ? 0 : 1,
        type: 2,
      };
      const res = await configNoti(params);
      dispatch(getUserInfo(useId));
      setState2(!state2);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Header
        title="通知設定"
        imageCenter
        back
      />
      <View style={styles.viewContent}>
        <View style={styles.item}>
          <Toggle
            title="自分が宛先の場合のみ通知する"
            status={state2}
            onChange={showMessage}
          />
        </View>
        <View style={styles.item}>
          <Toggle
            title="Push通知を表示する"
            status={state1}
            onChange={mentionFlag}
          />
        </View>
      </View>
    </View>
  );
};

export {ConfigNoti};
