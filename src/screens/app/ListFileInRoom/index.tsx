import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {stylesCommon} from '@stylesCommon';
import {Header} from '@component';

import {HeaderButton} from './Component/HeaderButton';
import {ViewImage} from './Component/ViewImage';
import {ViewFile} from './Component/ViewFile';
import {ViewUrl} from './Component/ViewUrl';

const ListFileInRoom = (props: any) => {
  const {route} = props;
  const {idRoom_chat} = route?.params;
  const [active, setActive] = useState<any>(null);

  const changeActive = useCallback(
    value => {
      setActive(value);
    },
    [active],
  );

  useEffect(() => {
    setTimeout(() => {
      setActive(1);
    }, 300);
  }, []);

  const renderView = useCallback(() => {
    switch (active) {
      case 1:
        return <ViewImage id={idRoom_chat} />;
      case 2:
        return <ViewFile id={idRoom_chat} />;
      case 3:
        return <ViewUrl id={idRoom_chat} />;
    }
  }, [active]);

  return (
    <View style={styles.container}>
      <Header title="メディア・ファイル・URL" imageCenter back />
      <View style={styles.viewContent}>
        <HeaderButton
          onActive={(value: number) => changeActive(value)}
          active={active}
        />
        {renderView()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
  },
});

export {ListFileInRoom};
