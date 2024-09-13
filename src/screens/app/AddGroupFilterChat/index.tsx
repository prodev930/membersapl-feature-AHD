import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from './style';
import {Header, AppInput, AppButton} from '@component';
import {iconSearch} from '@images';
import {useDispatch} from 'react-redux';
import {showHideModalFilterListChat} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {Item} from './Item';
import {
  getRoomListApi,
  detailCategory,
  GlobalService,
  createCategory,
  updateCategory,
} from '@services';
import {useSelector} from 'react-redux';

const AddGroupFilterChat = (props: any) => {
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const {route} = props;
  const {id} = route?.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const [detail, setDetail] = useState<any>(null);
  const [listChat, setListChat] = useState([]);
  const [dataLocal, setDataLocal] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertData = async (result: any, detail: any) => {
    if (result?.length > 0) {
      let data: any = [...result];
      data?.forEach((itemData: any, indexData: any) => {
        detail?.rooms?.forEach((itemDetail: any) => {
          if (itemData?.id === itemDetail?.id) {
            data[indexData].checked = true;
          }
        });
      });

      setListChat(data);
      setDataLocal(data);
      setLoading(false);
    } else {
    }
  };

  const onSearch = async (value: string) => {
    if (value?.length === 0) {
      setDataLocal(listChat);
    } else {
      const result = await listChat.filter((item: any) =>
        item.name.includes(value),
      );
      setDataLocal(result);
    }
  };

  const onSelect = (value: any, checked: any) => {
    const nList: any = [...listChat];

    const id = (element: any) => element?.id == value;
    const indexValue = nList?.findIndex(id);

    nList[indexValue].checked = !checked;
    setListChat(nList);
  };

  const getData = async () => {
    if (id) {
      try {
        const params = {key: null, company_id: idCompany, page: 1};
        const res = await getRoomListApi(params);
        const result = res?.data?.rooms?.data?.map((item: any) => {
          return {
            ...item,
            name:
              item?.name && item?.name?.length > 0
                ? item?.name
                : `${
                    item?.one_one_check ? item?.one_one_check[0]?.last_name : ''
                  } ${
                    item?.one_one_check
                      ? item?.one_one_check[0]?.first_name
                      : ''
                  }`,
            checked: false,
          };
        });

        const resDetail = await detailCategory(id);
        setDetail(resDetail?.data?.category);
        setValue(resDetail?.data?.category?.name);

        convertData(result, resDetail?.data?.category);
      } catch (error) {}
    } else {
      const params = {key: null, company_id: idCompany, page: 1};
      const res = await getRoomListApi(params);
      const result = res?.data?.rooms?.data?.map((item: any) => {
        return {
          ...item,
          name:
            item?.name && item?.name?.length > 0
              ? item?.name
              : `${
                  item?.one_one_check ? item?.one_one_check[0]?.last_name : ''
                } ${
                  item?.one_one_check ? item?.one_one_check[0]?.first_name : ''
                }`,
          checked: false,
        };
      });
      setListChat(result);
      setDataLocal(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onBack = () => {
    navigation.goBack();
    dispatch(showHideModalFilterListChat(true));
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Item
        item={item}
        index={index}
        onPress={() => onSelect(item?.id, item?.checked)}
      />
    );
  };

  const renderIds = () => {
    let arr: any = [];
    listChat?.forEach((item: any) => {
      if (item?.checked === true) {
        arr = arr?.concat([item?.id]);
      }
    });

    return arr;
  };

  const onSubmitCategory = async () => {
    if (id) {
      GlobalService.showLoading();
      try {
        const data = {
          category_id: detail?.id,
          name: value,
          room_ids: renderIds(),
        };
        const res = await updateCategory(data);
        GlobalService.hideLoading();
        onBack();
      } catch (error) {
        GlobalService.hideLoading();
      }
    } else {
      GlobalService.showLoading();
      try {
        const data = {
          name: value,
          room_ids: renderIds(),
        };
        const res = await createCategory(data);
        GlobalService.hideLoading();
        onBack();
      } catch (error) {
        GlobalService.hideLoading();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header back title="カテゴリを新規作成" customBack={onBack} />
      <View style={styles.viewContent}>
        <Text style={styles.textTitleInput}>カテゴリ名:</Text>
        <AppInput
          onChange={(text: any) => {
            setValue(text);
          }}
          value={value}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
        />
        <Text style={styles.textTitleInput}>グループを選択:</Text>
        <AppInput
          onChange={(text: any) => {
            setValue2(text);
            onSearch(text);
          }}
          value={value2}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
        />
        <View style={styles.container}>
          {loading === false ? (
            <FlatList
              data={dataLocal}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.viewLoading}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </View>
      <View style={styles.viewBottom}>
        <AppButton
          title="保存"
          onPress={onSubmitCategory}
          styleButton={styles.button}
          disabled={value?.length === 0}
        />
      </View>
    </View>
  );
};

export {AddGroupFilterChat};
