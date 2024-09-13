import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {logo, iconBack} from '@images';
import {Formik} from 'formik';
import * as yup from 'yup';
import {validateForm} from '@util';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {GlobalService, forgotPassword} from '@services';
import {showMessage} from 'react-native-flash-message';
import {HITSLOP} from '@util';

import {AppButton, AppInput} from '@component';

const ForgotPassword = () => {
  const navigation = useNavigation<any>();
  const [success, setSuccess] = useState<boolean>(false);
  const formInitialValues = {
    login: '',
  };
  const validationSchema = yup.object().shape({
    login: validateForm().login,
  });

  const onSubmit = useCallback(
    async (value: any) => {
      try {
        GlobalService.showLoading();
        const res = await forgotPassword(value);
        showMessage({
          message: res?.data?.message,
          type: 'success',
        });
        setSuccess(!success);
        GlobalService.hideLoading();
      } catch (err) {
        GlobalService.hideLoading();
      }
    },
    [success],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.buttonBack}>
          <TouchableOpacity hitSlop={HITSLOP} onPress={goBack}>
            <Image source={iconBack} />
          </TouchableOpacity>
        </View>
        <Image style={styles.image} source={logo} />
        <Text style={styles.txtTitle}>
          {success === false ? 'パスワード再発行' : '仮パスワード発行送信完了'}
        </Text>
        {success === false ? (
          <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}>
            {props => {
              return (
                <View style={styles.linearGradient}>
                  <View style={styles.viewContent}>
                    <Text style={styles.txtTitleLogin}>
                      MEMBERSにログインするためのパスワードをお忘れになった場合は、以下のフォームにメンバーIDを入力し、「送信」ボタンを押してください。パスワード再発行のご案内メールを送信いたします。
                    </Text>
                    <Text style={styles.titleInput}>メンバーID</Text>
                    <AppInput
                      placeholder="MB000000"
                      onChange={props.handleChange('login')}
                      value={props.values.login}
                      error={props.errors.login}
                    />
                    <AppButton
                      title="送信"
                      onPress={props.handleSubmit}
                      disabled={props.values.login?.length === 0}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        ) : (
          <View style={styles.linearGradient}>
            <View style={styles.viewContent}>
              <Text style={styles.txtTitleLogin}>
                ご入力いただいたメンバーIDに登録されているメールアドレス宛に仮パスワードを記載したメールを送信しました。
              </Text>
              <AppButton title="ログインページへ" onPress={goBack} />
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export {ForgotPassword};
