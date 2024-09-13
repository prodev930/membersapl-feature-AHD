import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';
import {iconDown, iconCreated, iconUp} from '@images';
import {AppButton} from '@component';
import {Colors} from './Colors';
import moment from 'moment/moment';

const Accordion = React.memo((props: any) => {
  const {item, onFinishTask, setShowTaskForm, showTaskForm, setSpecificItem} =
    props;
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState('');

  const setTaskColor = useCallback(item => {
    const currentDate = moment().unix();
    const plansEndDate = moment(
      item.plans_end_date + ' ' + item.plans_end_time,
      'YYYY/MM/DD hh:mm:ss',
    ).unix();
    const threeDaysLater = moment()
      .add(+3, 'days')
      .unix();
    let colorString;
    if (plansEndDate < currentDate) {
      colorString = '#F0C2B4';
    } else if (plansEndDate < threeDaysLater) {
      //期限3日前以内
      colorString = '#F7ECD7';
    } else {
      colorString = '#E1E8F4';
    }
    setColor(colorString);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    setTaskColor(item);
  }, []);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const finishTask = () => {
    const data = {
      project_id: item.project_id,
      task_id: item.id,
      task_name: item?.name,
      actual_start_date: item.actual_start_date,
      actual_end_date: item.actual_end_date,
      plans_end_date: item.plans_end_date,
      plans_end_time: item.plans_end_time,
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
  const showEdit = () => {
    setShowTaskForm(!showTaskForm);
    setSpecificItem(item);
  };

  return (
    <>
      <View style={styles(color).container}>
        <TouchableOpacity
          style={styles(color).row}
          onPress={() => toggleExpand()}>
          <View style={styles(color).viewImage}>
            <View style={styles(color).image}>
              {expanded ? (
                <Image source={iconUp} style={styles(color).iconUp} />
              ) : (
                <Image source={iconDown} style={styles(color).iconDown} />
              )}
            </View>
          </View>
          <View style={styles(color).viewTxt}>
            <>
              <Text style={styles(color).txtContent} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles(color).txtDate} numberOfLines={2}>
                期限：{item?.plans_end_date} {item?.plans_end_time?.substring(0, 5)}
              </Text>
            </>
          </View>
          <View style={styles(color).viewFinish}>
            {item.stat !== 2 ? (
              <AppButton
                title={'完了'}
                onPress={finishTask}
                styleButton={styles(color).buttonFinish}
                styleTitle={styles(color).buttonFinishTitle}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        {expanded && (
          <TouchableOpacity
            onPress={() => showEdit(item)}
            style={styles(color).childContainer}>
            <View style={styles(color).child}>
              <View style={styles(color).contentCreated}>
                <Image source={iconCreated} style={styles(color).imageCreated} />
                <Text style={styles(color).txtCreated}>
                  作成日：{item?.created_at?.substring(0, 10)}
                </Text>
              </View>
              <View style={styles(color).parentHr} />
              {item.persons.map((person) => {
                if (person?.name) {
                  return (
                    <View style={styles(color).rowCreatedUser}>
                      <Image
                        style={styles(color).avatar}
                        source={{
                          uri: person?.icon,
                        }}
                      />
                      <Text style={styles(color).textContentInput}>
                        {person?.name}
                      </Text>
                    </View>
                  );
                }
              })}
              <View style={styles(color).parentHr} />
              <Text style={styles(color).textTitleInput}>説明:</Text>
              <Text style={styles(color).txtExpandedContent}>
                {item?.description
                  ?.replace(/(<([^>]+)>)/gi, '')
                  .replace(/&nbsp;/gi, '')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
});

const styles = (color: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius: verticalScale(20) / 2,
      marginVertical: scale(5),
      marginHorizontal: scale(10),
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
      width: '5%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    viewTxt: {
      width: '70%',
      justifyContent: 'center',
    },
    txtTitle: {
      ...stylesCommon.fontWeight500,
      fontSize: moderateScale(12),
      color: colors.primary,
      marginTop: verticalScale(3),
    },
    txtContent: {
      ...stylesCommon.fontWeight600,
      fontSize: moderateScale(11),
      marginTop: verticalScale(5),
      color: colors.black,
    },
    txtCreated: {
      fontSize: moderateScale(11),
      marginTop: verticalScale(5),
      color: colors.black,
      paddingBottom: 10,
    },
    txtContentLogout: {
      color: '#EA5A31',
      ...stylesCommon.fontWeight500,
      fontSize: moderateScale(16),
    },
    image: {
      width: moderateScale(30),
      height: moderateScale(30),
    },
    txtDate: {
      fontSize: moderateScale(8),
      color: colors.darkGrayText,
      ...stylesCommon.fontWeight500,
      marginTop: verticalScale(3),
    },
    viewDelete: {
      width: '10%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    imageDelete: {
      tintColor: 'red',
    },
    viewFinish: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    buttonFinish: {
      width: '80%',
      paddingVertical: moderateScale(10),
      borderRadius: verticalScale(10) / 2,
    },
    buttonFinishTitle: {
      fontSize: moderateScale(11),
      fontWeight: 'bold',
    },
    iconUp: {
      width: '50%',
      tintColor: colors.darkGrayText,
    },
    iconDown: {
      width: '50%',
      tintColor: colors.darkGrayText,
    },

    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.WHITE,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 56,
      alignItems: 'center',
      paddingLeft: scale(10),
      paddingRight: scale(10),
    },
    rowCreatedUser: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: 46,
      paddingLeft: 5,
      paddingRight: 18,
      alignItems: 'center',
    },
    parentHr: {
      height: 1,
      color: color,
      width: '100%',
      borderWidth: 0.5,
      borderColor: Colors.LIGHTGRAY,
    },
    childContainer: {
      width: '100%',
    },
    child: {
      width: '100%',
      backgroundColor: Colors.WHITE,
      margin: 0,
      padding: 16,
      borderBottomLeftRadius: verticalScale(20) / 2,
      borderBottomRightRadius: verticalScale(20) / 2,
      borderColor: color,
      borderWidth: 1,
      paddingLeft: scale(30),
      paddingRight: scale(10),
    },
    avatar: {
      width: verticalScale(15),
      height: verticalScale(15),
      borderRadius: verticalScale(20) / 2,
    },
    textTitleInput: {
      color: colors.black,
      fontSize: moderateScale(11),
      ...stylesCommon.fontWeight600,
      marginTop: 15,
      marginBottom: 10,
    },
    textContentInput: {
      paddingLeft: scale(10),
      color: '#000000',
      fontSize: 14,
      marginTop: 15,
      marginBottom: 10,
    },
    icon: {
      tintColor: colors.border,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    imageCreated: {
      width: 15,
      height: 15,
      marginRight: scale(10),
    },
    contentCreated: {
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      paddingLeft: scale(5),
    },
  });

export {Accordion};
