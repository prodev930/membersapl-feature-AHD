import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {iconAddListChat} from '@images';

const ViewHeader = React.memo((props: any) => {
  const {title, onPressAdd} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>{title}</Text>
      {onPressAdd ? (
        <TouchableOpacity onPress={onPressAdd}>
          <Image source={iconAddListChat} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateVerticalScale(16),
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeader: {
    ...stylesCommon.fontWeight600,
    color: '#595757',
    fontSize: moderateVerticalScale(14),
  },
});

export {ViewHeader};
