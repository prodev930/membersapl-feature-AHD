import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  iconEdit,
  like,
  happy,
  heart,
  great,
  smile,
  sad,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  understand,
  bow,
  congrats,
} from '@images';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

const Reaction = React.memo((props: any) => {
  const {reaction} = props;
  //Các image reaction được đánh tên và trọng số trùng với id VD: icon1 => tương ứng với id là 1
  const renderSource = useCallback(value => {
    switch (value) {
      case 1:
        return icon1;
      case 2:
        return icon2;
      case 3:
        return icon3;
      case 4:
        return icon4;
      case 5:
        return icon5;
      case 6:
        return icon6;
      case 7:
        return understand;
      case 8:
        return bow;
      case 9:
        return congrats;
    }
  }, []);

  return (
    <>
      {reaction?.map((item: any, index: any) => {
        return (
          <Image
            key={index}
            source={renderSource(item.reaction_no)}
            style={[item.reaction_no === 1 ? styles.imageHeart : styles.image]}
          />
        );
      })}
    </>
  );
});

const styles = StyleSheet.create({
  image: {
    width: moderateScale(14),
    height: moderateScale(14),
    marginHorizontal: moderateScale(2),
  },
  imageHeart: {
    width: moderateScale(14),
    height: moderateScale(12),
    marginHorizontal: moderateScale(2),
  },
});

export {Reaction};
