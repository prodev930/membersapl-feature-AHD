import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import {
  iconDown,
} from "@images";
import {AppButton} from '@component';

const Item = React.memo((props: any) => {
  const {item, onClickItem, onFinishTask} = props;

  const finishTask = () => {
    const data = {
      project_id: item.project_id,
      task_id: item.id,
      task_name: item?.name,
      plans_time: item.plans_time,
      actual_time: item.actual_time,
      plans_cnt: item.plans_cnt,
      actual_cnt: item.actual_cnt,
      cost: item.cost,
      task_person_id: item.persons.map((person: {user_id: any}) => {
        return person.user_id;
      }),
      description: item.description,
      cost_flg: item.cost_flg,
      remaindar_flg: item.remaindar_flg,
      repeat_flag: item.time,
      stat: item.stat,
    };
    onFinishTask(data);
  };

  return (
    <TouchableOpacity style={styles(props).container} onPress={onClickItem}>
      <View style={styles(props).viewContent}>
        <View style={styles(props).viewImage}>
          <View style={styles(props).image}>
            <Image source={iconDown} style={styles(props).iconDown} />
          </View>
        </View>
        <View style={styles(props).viewTxt}>
          <>
            <Text style={styles(props).txtContent} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={styles(props).txtDate} numberOfLines={2}>
              期限：{item?.plans_end_date}　{item?.plans_end_time}
            </Text>
          </>
        </View>
        {item.stat !== 2 ? (
          <View style={styles(props).viewFinish}>
            <AppButton
              title={'完了'}
              onPress={finishTask}
              styleButton={styles(props).buttonFinish}
              styleTitle={styles(props).buttonFinishTitle}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
});

const styles = (props: {item: {stat: number}}) =>
  StyleSheet.create({
    container: {
      paddingLeft: scale(10),
      paddingRight: scale(10),
      backgroundColor:
        props.item.stat === 0
          ? '#707070'
          : props.item.stat === 1
          ? '#19a2aa'
          : props.item.stat === 2
          ? '#eb5a30'
          : props.item.stat === 3
          ? '#3071EB'
          : props.item.stat === 4
          ? '#C2A557'
          : '#FFFFFF',
    },
    viewContent: {
      paddingBottom: verticalScale(12),
      flexDirection: 'row',
    },
    linearGradient: {
      width: '100%',
      height: 1,
    },
    viewImage: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    viewTxt: {
      width: '60%',
      justifyContent: 'center',
    },
    txtContent: {
      ...stylesCommon.fontWeight600,
      fontSize: moderateScale(14),
      marginTop: verticalScale(5),
      color: colors.backgroundTab,
    },
    txtContentLogout: {
      color: '#EA5A31',
      ...stylesCommon.fontWeight500,
      fontSize: moderateScale(16),
    },
    image: {
      paddingTop: '20%',
      width: moderateScale(51),
      height: moderateScale(51),
    },
    txtDate: {
      fontSize: moderateScale(11),
      color: colors.darkGrayText,
      ...stylesCommon.fontWeight500,
      marginTop: verticalScale(3),
    },
    viewFinish: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    buttonFinish: {
      width: '100%',
      paddingVertical: 10,
    },
    buttonFinishTitle: {
      fontSize: 14,
    },
    iconDown: {
      tintColor: colors.darkGrayText,
    },
  });

export {Item};
