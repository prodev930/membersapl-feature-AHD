import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {CHAT_STAMP_ICONS} from '@images';

const CONTAINER_PADDING_HORIZONTAL = 17;
const CONTAINER_PADDING_VERTICAL = 7;

const GAP_X = 25;
const GAP_Y = 5;

const DEFAULT_NUM_COLUMNS = 4;

const getNumColumns = (width: number, height: number) => {
  const numColumns = Math.round(
    width < height ? DEFAULT_NUM_COLUMNS : width / 100,
  );
  return numColumns;
};

const getMaxRow = (width: number, height: number) => {
  if (width < height) {
    return 3;
  }
  return 1;
};

const getStyles = (childWith: number, maxHeight: number) =>
  StyleSheet.create({
    wrap: {
      width: '100%',
      flexDirection: 'row',
      shadowColor: '#D6D6D6',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 14,
      maxHeight,
    },
    image: {
      width: childWith,
      height: childWith,
    },
  });

const ModalStamp = React.memo((props: any) => {
  const {onChose} = props;

  const [layout, setLayout] = useState<{width: number; height: number}>({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const orientation = layout.width > layout.height ? 'landscape' : 'portrait';

  useEffect(() => {
    const handleResize = () => {
      setLayout({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    const handleWindowResizeEvent = Dimensions.addEventListener(
      'change',
      handleResize,
    );

    return () => {
      handleWindowResizeEvent.remove();
    };
  }, []);

  const numColumns = getNumColumns(layout.width, layout.height);
  const totalGap = (numColumns - 1) * GAP_X;
  const childWidth = Math.floor(
    (layout.width - totalGap - CONTAINER_PADDING_HORIZONTAL * 2) / numColumns,
  );

  const maxRow = getMaxRow(layout.width, layout.height);

  const maxHeight =
    childWidth * maxRow + GAP_Y * (maxRow - 1) + CONTAINER_PADDING_VERTICAL * 2;

  const modalStampStyles = getStyles(childWidth, maxHeight);

  return (
    <View style={modalStampStyles.wrap}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={CHAT_STAMP_ICONS}
        contentContainerStyle={styles.flatListContentContainerStyle}
        columnWrapperStyle={styles.flatListColumnWrapperStyle}
        style={styles.flatList}
        key={orientation}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item?.id}
            onPress={() => {
              onChose(item?.id);
            }}>
            <Image
              source={item?.url}
              resizeMode="contain"
              style={modalStampStyles.image}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => `modal_stamp_${item.id}`}
        numColumns={numColumns}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    backgroundColor: '#fff',
  },
  flatListColumnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: GAP_Y,
  },
  flatListContentContainerStyle: {
    paddingVertical: CONTAINER_PADDING_VERTICAL,
  },
});

export {ModalStamp};
