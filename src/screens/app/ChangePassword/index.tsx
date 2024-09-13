import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, AppInput, AppButton} from '@component';
import {iconClose} from '@images';
import {colors} from '@stylesCommon';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import {validateForm} from '@util';
import {saveInfoUser} from '@redux';
import {GlobalService, updateProfile, changePassword} from '@services';
import {showMessage} from 'react-native-flash-message';

const ChangePassword = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();

  const formInitialValues = {
    current_password: '',
    password: '',
    password_confirmation: '',
  };

  const validationSchema = yup.object().shape({
    current_password: validateForm().first_name,
    password: validateForm().password,
    password_confirmation: validateForm().confirmPassword,
  });

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = async (value: any) => {
    try {
      GlobalService.showLoading();
      const res = await changePassword(value);
      showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      onBack();
      GlobalService.hideLoading();
    } catch {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="パスワードを変更する"
        imageCenter
        iconRightFirst={iconClose}
        onRightFirst={onBack}
      />
      <View style={styles.viewContent}>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}>
          {props => {
            return (
              <View style={styles.linearGradient}>
                <KeyboardAwareScrollView
                  style={styles.viewForm}
                  showsVerticalScrollIndicator={false}>
                  <Text style={styles.txtTitle}>現在のパスワード</Text>
                  <AppInput
                    placeholder="現在のパスワード"
                    onChange={props.handleChange('current_password')}
                    value={props.values.current_password}
                    error={props.errors.current_password}
                    secureTextEntry={true}
                  />
                  <Text style={styles.txtTitle}>新しいパスワード</Text>
                  <AppInput
                    placeholder="新しいパスワード"
                    onChange={props.handleChange('password')}
                    value={props.values.password}
                    error={props.errors.password}
                    secureTextEntry={true}
                  />
                  <Text style={styles.txtTitle}>新しいパスワードを確認</Text>
                  <AppInput
                    placeholder="新しいパスワードを確認"
                    onChange={props.handleChange('password_confirmation')}
                    value={props.values.password_confirmation}
                    error={props.errors.password_confirmation}
                    secureTextEntry={true}
                  />
                  <AppButton
                    title="アップデート"
                    onPress={props.handleSubmit}
                    styleButton={styles.button}
                  />
                </KeyboardAwareScrollView>
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export {ChangePassword};
