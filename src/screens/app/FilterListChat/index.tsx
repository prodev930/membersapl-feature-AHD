import React, {useEffect, useState} from 'react';
import {View, Text, Modal} from 'react-native';
import {styles} from './style';
import {ViewFilter} from './component/ViewFilter';
import {ViewList} from './component/ViewList';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getRoomList, saveCategoryFilter, saveTypeFilter} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {getListCategory, deleteCategory} from '@services';

const FilterListChat = React.memo((props: any) => {
  const dispatch = useDispatch();
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const navigation = useNavigation<any>();
  const {visible, closeModal} = props;
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const callApiListChat = async (value: number) => {
    dispatch(
      getRoomList({key: null, company_id: idCompany, page: 1, type: value}),
    );
    await dispatch(saveTypeFilter(value));
    await dispatch(saveCategoryFilter(null));

    closeModal();
  };

  const getListCategoryFuc = async () => {
    try {
      const response = await getListCategory();
      setListCategory(response?.data?.categories);
      setLoading(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    if (visible === true) {
      getListCategoryFuc();
    } else {
    }
  }, [visible]);

  const onPressViewList = async (value: any, type: any) => {
    if (type === 'Create') {
      closeModal();
      navigation.navigate(ROUTE_NAME.ADD_GROUP_FILTER_CHAT, {id: null});
    } else if (type === 'Detail') {
      closeModal();
      navigation.navigate(ROUTE_NAME.ADD_GROUP_FILTER_CHAT, {id: value?.id});
    } else if (type === 'Delete') {
      try {
        const res = await deleteCategory(value?.id);
        getListCategoryFuc();
      } catch (error) {}
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <ViewFilter onClick={(value: number) => callApiListChat(value)} />
          <ViewList
            onPressAdd={() => {
              onPressViewList(null, 'Create');
            }}
            list={listCategory}
            onPress={(value: any) => {
              dispatch(
                getRoomList({
                  key: null,
                  company_id: idCompany,
                  page: 1,
                  type: 0,
                  category_id: value?.id,
                }),
              );
              dispatch(saveCategoryFilter(value?.id));
              dispatch(saveTypeFilter(0));

              closeModal();
            }}
            onEdit={(value: any) => onPressViewList(value, 'Detail')}
            onDelete={(value: any) => onPressViewList(value, 'Delete')}
            loading={loading}
          />
        </View>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
      </View>
    </Modal>
  );
});

export {FilterListChat};
