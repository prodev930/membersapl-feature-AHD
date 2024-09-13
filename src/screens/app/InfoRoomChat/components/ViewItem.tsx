import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {iconNext} from '@images';
import {validateLink} from '@util';
import Autolink from 'react-native-autolink';

const ViewItem = React.memo((props: any) => {
  const {
    sourceImage,
    title,
    content,
    hideBorder,
    hideNext,
    isLogout,
    onClick,
    disabled,
  } = props;

  const onClickContent = useCallback(() => {
    if (validateLink(content)) {
      Linking.openURL(content);
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onClick}
      disabled={disabled}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <Image
            source={sourceImage}
            style={{tintColor: isLogout ? '#EA5A31' : colors.darkGrayText, width: 30, height: 30}}
          />
        </View>
        <View style={styles.viewTxt}>
          <>
            {title ? <Text style={styles.txtTitle}>{title}</Text> : null}
            {content ? (
              <Autolink
                text={content}
                email
                url
                renderText={text => (
                  <Text
                    style={[
                      styles.txtContent,
                      {color: isLogout ? '#EA5A31' : colors.darkGrayText},
                    ]}>
                    {text}
                  </Text>
                )}
              />
            ) : null}
          </>
        </View>
        <View style={styles.viewImageNext}>
          {!hideNext && <Image source={iconNext} />}
        </View>
      </View>
      {!hideBorder && <View style={styles.linearGradient} />}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(18),
  },
  viewContent: {
    paddingVertical: verticalScale(16),
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
  },
  viewImage: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTxt: {
    width: '65%',
    justifyContent: 'center',
  },
  viewImageNext: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.border,
  },
  txtContent: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
});

export {ViewItem};
