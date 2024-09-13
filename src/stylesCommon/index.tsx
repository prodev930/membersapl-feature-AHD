import {StyleSheet, Platform} from 'react-native';

const colors = {
  primary: '#1AA1AA',
  secondPrimary: '#EA5A31',
  border: '#989898',
  background: '#F4F2EF',
  placeholder: '#BDBDBD',
  backgroundTab: '#595757',
  activeTab: '#82F7FF',
  inActiveTab: '#FFFFFF',
  darkGrayText: '#595757',
  colorGradient: ['#8BC227', '#1AA1AA', '#FCD000', '#F4A217', '#EA5A31'],
  active: '#8BC227',
  black: '#000000',
  white: '#FFFFFF',
};

//Font chữ được sử dụng trong app
const stylesCommon = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fontWeight500: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight600: {
    fontFamily: 'Inter-SemiBold',
  },
});

export {colors, stylesCommon};
