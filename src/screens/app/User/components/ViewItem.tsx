import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type ImageSourcePropType,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {iconNext} from '@images';
import {colors, stylesCommon} from '@stylesCommon';

type ViewItemProps = {
  sourceImage: ImageSourcePropType;
  title?: string;
  content?: string;
  hideBorder?: boolean;
  hideNext?: boolean;
  isLogout?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ViewItem = React.memo((props: ViewItemProps) => {
  const {sourceImage, title, content, hideBorder, hideNext, isLogout, onPress} =
    props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <Image
            source={sourceImage}
            style={{
              tintColor: isLogout ? '#EA5A31' : colors.darkGrayText,
              width: scale(25),
              height: scale(25),
            }}
          />
        </View>
        <View style={styles.viewTxt}>
          {!isLogout ? (
            <>
              {title ? <Text style={styles.txtTitle}>{title}</Text> : null}
              {content ? (
                <Text style={styles.txtContent}>{content}</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.txtContentLogout}>{content}</Text>
          )}
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
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(16),
  },
  icon: {
    tintColor: colors.darkGrayText,
  },
});

export {ViewItem};
