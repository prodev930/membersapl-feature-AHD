import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';

import {AppButton, Header} from '@component';

import {ModalTask} from './component/ModalTask';
import {Accordion} from './component/Accordion';
import {styles} from './styles';
import {useFunction} from './useFunction';

const Task = ({route}: any) => {
  const {idRoom_chat} = route?.params;

  const {
    setShowTaskForm,
    showTaskForm,
    onUpdateTask,
    selected,
    setSelected,
    onSaveTask,
    isShowTaskCreateForm,
    toggleShowTaskCreateForm,
    onFinishTask,
    setSpecificItem,
    specificItem,
    listTask,
    resetGetListTaskParams,
    handleLoadMore,
    onRefresh,
  } = useFunction(idRoom_chat);

  const renderItem = ({item}: any) => (
    <Accordion
      key={item.id}
      item={item}
      onFinishTask={onFinishTask}
      setShowTaskForm={setShowTaskForm}
      showTaskForm={showTaskForm}
      setSpecificItem={setSpecificItem}
      specificItem={specificItem}
    />
  );

  return (
    <View style={styles.container}>
      <View style={showTaskForm ? [styles.blackout] : []} />
      <View style={showTaskForm ? [styles.displayNone] : []}>
        <Header title="タスク一覧" back imageCenter />
        <View style={styles.viewContent}>
          <View style={styles.createTaskButtonView}>
            <AppButton
              title="タスクを作成する"
              onPress={toggleShowTaskCreateForm}
            />
          </View>

          <FlatList
            data={listTask}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
            onEndReachedThreshold={0.01}
            onEndReached={handleLoadMore}
            contentContainerStyle={{paddingBottom: 300}}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
      <ModalTask
        visible={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        onUpdateTask={onUpdateTask}
        onUpdateTaskCallback={resetGetListTaskParams}
        idRoomChat={idRoom_chat}
        item={specificItem}
        selected={selected}
        setSelected={setSelected}
      />

      {isShowTaskCreateForm && (
        <ModalTask
          visible={isShowTaskCreateForm}
          onCancel={toggleShowTaskCreateForm}
          onSaveTask={onSaveTask}
          idRoomChat={idRoom_chat}
          selected={selected}
          setSelected={setSelected}
          showTaskForm={isShowTaskCreateForm}
        />
      )}
    </View>
  );
};

export {Task};
