import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {MainStackParamList} from '@navigation';

export type ResponseErrorType = {
  data: {
    errors: {
      addition?: string[];
      first_name?: string[];
      last_name?: string[];
      email?: string[];
    };
  };
};

export type FormInputs =
  | {
      first_name: string;
      last_name: string;
      addition: string | null;
    }
  | {email: string};

export type EditUserScreenNavigationProps = NativeStackNavigationProp<
  MainStackParamList,
  'EDIT_USER'
>;

export type EditUserScreenRouteProps = RouteProp<
  MainStackParamList,
  'EDIT_USER'
>;

export type EditUserScreenProps = {
  navigation: EditUserScreenNavigationProps;
  route: EditUserScreenRouteProps;
};
