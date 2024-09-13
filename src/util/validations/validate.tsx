import {number, ref, string} from 'yup';
import {
  REQUIRED_ERROR,
  maxLengthString,
  minLengthString,
  nonNumberString,
} from '../formError';
import {NON_NUMBER_REGEX} from '../constanString';

export const validateForm = () => {
  return {
    login: string().required(REQUIRED_ERROR),
    current_password: string().required(REQUIRED_ERROR),
    password: string().required(REQUIRED_ERROR),
    first_name: string()
      .required(REQUIRED_ERROR)
      .matches(NON_NUMBER_REGEX, nonNumberString('氏名（名）')),
    last_name: string()
      .required(REQUIRED_ERROR)
      .matches(NON_NUMBER_REGEX, nonNumberString('氏名（姓）')),
    addition: string().nullable(),
    email: string().required(REQUIRED_ERROR).email('電子メールが無効です'),
    confirmPassword: string()
      .required(REQUIRED_ERROR)
      // .min(VALIDATE.minPassLength, trans("validate.minConfirmPassError"))
      // .max(VALIDATE.maxPassLength, trans("validate.maxConfirmPassError"))
      .oneOf(
        [ref('password'), null],
        'パスワードがパスワードと一致しないことを確認する',
      ),

    fullname: string()
      .required(REQUIRED_ERROR)
      .max(100, maxLengthString(100, 'フルネーム')),
    phone: string()
      .required(REQUIRED_ERROR)
      .min(7, minLengthString(7, '電話番号'))
      .max(11, maxLengthString(11, '電話番号')),
    prefix: string().required(REQUIRED_ERROR),
    is_volunteer: number().required(REQUIRED_ERROR),
    dob: string().required(REQUIRED_ERROR),
    location: string().required(REQUIRED_ERROR),
    language: string().required(REQUIRED_ERROR),
  };
};
