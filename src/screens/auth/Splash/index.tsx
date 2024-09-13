import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {AppNotification} from '@util';

const Splash = () => {
  const {removeBadge} = AppNotification;
  const token = useSelector((state: any) => state?.auth?.token);
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const navigation = useNavigation<any>();
  var timer: any;

  // Note: Vì luồng login khách hàng đòi sửa quá nhiều nên phải làm theo dạng này

  useEffect(() => {
    //Hàm logic check các event khi ở màn splash 1700 mili giây
    timer = setTimeout(() => {
      if (token) {
        if (idCompany) {
          //Nếu đã chọn company rồi thì navigate thẳng đến Tab và reset lại stack
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ROUTE_NAME.TAB_SCREEN}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ROUTE_NAME.SELECT_COMPANY}],
            }),
          );
        }
      } else {
        removeBadge();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTE_NAME.LOGIN}],
          }),
        );
      }
    }, 1700);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //Note: Chú ý phần này render ra ảnh dạng gif nên phải chú ý trong file manifest của android

  return (
    <View style={styles.container}>
      <Image source={require('./splash.gif')} style={styles.image} />
    </View>
  );
};

export {Splash};
