import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {UserAddition} from '@component';
import {defaultAvatar} from '@images';
import {colors, stylesCommon} from '@stylesCommon';

const width = Dimensions.get('window').width;

const ModalTagName = React.memo((props: any) => {
  const {choseUser, mentionQuery} = props;
  const [dataLocal, setDataLocal] = useState<any[]>([]);
  const listUserChat = useSelector((state: any) => state.chat?.listUserChat);

  useEffect(() => {
    const dataAddAll = [
      {
        id: 'All',
        last_name: '@all このグループ全員に',
        first_name: '通知が送信されます',
        value: 'all',
      },
      ...(listUserChat ?? []).map((item: any) => {
        return {
          ...item,
          nameUser: `${item?.last_name}${item?.first_name}`,
        };
      }),
    ];

    setDataLocal(dataAddAll);
  }, [listUserChat]);

  const filteredData = mentionQuery === '@'
  ? dataLocal 
  : dataLocal.filter((item) => {
      const fullName = item.last_name + item.first_name;
      return fullName.includes(mentionQuery);
    });

  const onChoseUser = (item: any) => {
    if (item?.id === 'All') {
      const valueName = `${item?.value}`;
      const id = item?.id;
      choseUser(valueName?.replace(' ', ''), ' ', id, item);
    } else {
      const valueName = `${item?.last_name}${item?.first_name}`;
      const id = item?.id;
      choseUser(valueName?.replace(' ', ''), 'さん', id, item);
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.viewItem} onPress={() => onChoseUser(item)}>
      <>
        {item?.id === 'All' ? (
          <>
            <FastImage source={defaultAvatar} style={styles.imageIconTag} />
            <Text
              style={[styles.txtTitle, styles.viewItemContent]}
              numberOfLines={2}>
              <Text style={styles.txtTitle} numberOfLines={2}>
                {item?.last_name}
                {item?.first_name}
              </Text>
            </Text>
          </>
        ) : (
          <>
            <FastImage
              source={
                item?.icon_image
                  ? {
                      uri: item?.icon_image,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }
                  : defaultAvatar
              }
              style={styles.image}
            />
            <View style={styles.viewItemContent}>
              {item?.id < 0 ? (
                <Text style={styles.txtTitle} numberOfLines={2}>
                  {item?.name}
                </Text>
              ) : (
                <Text style={styles.txtTitle} numberOfLines={2}>
                  {item?.last_name}
                  {item?.first_name}
                </Text>
              )}

              {!!item?.addition && (
                <UserAddition
                  content={item.addition}
                  customStyle={styles.txtAddition}
                />
              )}
            </View>
          </>
        )}
      </>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: width,
    maxHeight: verticalScale(200),
    backgroundColor: colors.white,
    paddingBottom: verticalScale(8),
  },
  viewLoading: {
    width: '100%',
    alignItems: 'center',
    paddingTop: verticalScale(8),
  },
  viewItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    alignItems: 'center',
  },
  viewItemContent: {
    paddingLeft: scale(8),
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(35 / 2),
  },
  imageIconTag: {
    width: moderateScale(35),
    height: moderateScale(35),
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(13),
    color: colors.backgroundTab,
    maxWidth: '90%',
  },
  txtAddition: {
    fontSize: moderateScale(10),
    maxWidth: '90%',
  },
});

export {ModalTagName};
