import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {Header} from '@component';
import {
  iconAttach,
  iconDetail,
  iconSearch,
  iconSend,
  iconSendActive,
} from '@images';
import {IS_ANDROID, IS_IOS} from '@util';

import {
  Actions,
  GiftedChat,
  InputToolbar,
} from '../../../lib/react-native-gifted-chat';
import type {ComposerRef} from './components/Composer';
import DecoButton from './components/DecoButton';
import {renderComposer, renderInputToolbar} from './components/InputToolbar';
import {ItemMessage} from './components/ItemMessage';
import {ModalEdit} from './components/ModalEdit';
import {ModalPickFile} from './components/ModalPickFile';
import {ModalPin} from './components/ModalPin';
import {ModalQuote} from './components/ModalQuote';
import {ModalReply} from './components/ModalReply';
import {ModalStamp} from './components/ModalStamp';
import {ModalTagName} from './components/ModalTagName';
import {ShowPickedFile} from './components/ShowPickedFile';
import {MIN_COMPOSER_HEIGHT, footerStyles, styles} from './styles';
import {useFunction} from './useFunction';

const MAX_COMPOSER_HEIGHT = 133;

const DetailChat = (props: any) => {
  // custom hook logic
  const {
    idRoomChat,
    chatUser,
    convertedMessageList,
    deleteMsg,
    dataDetail,
    sendMessage,
    navigateToDetail,
    message_pinned,
    updateGimMessage,
    onLoadMore,
    onLoadMoreDown,
    replyMessage,
    messageReply,
    editMessage,
    messageEdit,
    reactionMessage,
    navigatiteToListReaction,
    pickFile,
    cancelModal,
    chosePhoto,
    choseFile,
    sendLabel,
    searchMessage,
    showModalStamp,
    isShowModalStamp,
    giftedChatRef,
    setShowTag,
    isShowTagModal,
    showModalTagName,
    listUserChat,
    bookmarkMessage,
    ids,
    setIds,
    setIndex,
    newIndexArray,
    quoteMessage,
    messageQuote,
    formattedText,
    setFormattedText,
    mentionedUsers,
    formatText,
    getText,
    me,
    showRedLine,
    idRedLine,
    navigateToMessage,
    indexRedLine,
    partCopy,
    changePartCopy,
    setInputText,
    inputText,
    textSelection,
    onDecoSelected,
    chosenFiles,
    deleteFile,
    setListUserSelect,
    listUserSelect,
    customBack,
    setInputIndex,
    inputIndex,
    isSendingMessage,
    setPageLoading,
    isShowDecoButtons,
    accessoryHeight,
    setAccessoryHeight,
    toggleDecoButtons,
    keyboardHeight,
  } = useFunction(props);

  const [mentionQuery, setMentionQuery] = useState<string>('');
  const mute = useSelector((state: any) => state.chat.isMuteStatusRoom);

  const inputRef = useRef<InputToolbar | null>(null);
  const composerRef = useRef<ComposerRef | null>(null);

  const isShowKeyboard = IS_ANDROID
    ? !!keyboardHeight
    : inputRef?.current?.state?.position === 'relative';

  const [minHeightInput, setMinHeightInput] = useState(0);

  const setDefaultMinHeightInput = (height: number) => {
    if (!minHeightInput) {
      setMinHeightInput(height);
    }
  };

  //Render ra UI chọn ảnh, video, file
  const renderActions = useCallback(
    (inputProps: any) => {
      return (
        <Actions
          {...inputProps}
          containerStyle={styles.attachIcon}
          onPressActionButton={cancelModal}
          icon={() => <Image source={iconAttach} />}
        />
      );
    },
    [cancelModal],
  );

  const renderSend = useCallback(
    (inputProps: any) => {
      const isActiveSendButton =
        (inputText.length > 0 || chosenFiles.length > 0) && !isSendingMessage;

      return (
        <>
          <View pointerEvents={!isActiveSendButton ? 'none' : 'auto'}>
            {
              <Actions
                {...inputProps}
                containerStyle={styles.buttonRight}
                onPressActionButton={() => {
                  const messages = [
                    {
                      text: getText(formattedText),
                      user: {_id: inputProps.user?._id},
                      createdAt: new Date(),
                    },
                  ];
                  sendMessage(messages);
                  setFormattedText([]);
                }}
                icon={() => {
                  return isActiveSendButton ? (
                    <View style={[styles.activeSendButton, styles.sendButton]}>
                      <Image source={iconSendActive} />
                    </View>
                  ) : (
                    <View style={styles.sendButton}>
                      <Image source={iconSend} />
                    </View>
                  );
                }}
              />
            }
          </View>
        </>
      );
    },
    [
      getText,
      sendMessage,
      setFormattedText,
      isSendingMessage,
      chosenFiles.length,
      inputText.length,
      formattedText,
    ],
  );

  //Render ra UI của message
  const renderMessage = useCallback(
    (inputProps: any) => {
      return (
        <>
          <ItemMessage
            {...inputProps}
            idRoomChat={idRoomChat}
            isFocusedInput={composerRef.current?.isFocused}
            deleteMsg={deleteMsg}
            onUnFocus={composerRef.current?.onUnFocus}
            pinMsg={updateGimMessage}
            replyMsg={replyMessage}
            editMsg={editMessage}
            bookmarkMsg={bookmarkMessage}
            onReaction={reactionMessage}
            changePartCopy={changePartCopy}
            quoteMsg={quoteMessage}
            navigatiteToListReaction={navigatiteToListReaction}
            listUser={listUserChat}
            newIndexArray={newIndexArray}
            me={me}
            showRedLine={showRedLine}
            idRedLine={idRedLine}
            isAdmin={dataDetail?.is_admin}
            moveToMessage={navigateToMessage}
            indexRedLine={indexRedLine}
            setFormattedText={setFormattedText}
            mentionedUsers={mentionedUsers}
            setListUserSelect={setListUserSelect}
            setInputText={setInputText}
            setPageLoading={setPageLoading}
            inputText={inputText}
          />
        </>
      );
    },
    [
      listUserChat,
      newIndexArray,
      bookmarkMessage,
      dataDetail?.is_admin,
      deleteMsg,
      editMessage,
      idRoomChat,
      indexRedLine,
      me,
      mentionedUsers,
      navigateToMessage,
      navigatiteToListReaction,
      quoteMessage,
      reactionMessage,
      changePartCopy,
      idRedLine,
      replyMessage,
      setFormattedText,
      showRedLine,
      updateGimMessage,
      setInputText,
      setListUserSelect,
      setPageLoading,
    ],
  );

  const renderAccessoryModals = useCallback(() => {
    if (isShowTagModal) {
      return (
        <ModalTagName
          idRoomChat={idRoomChat}
          mentionQuery={mentionQuery}
          choseUser={(value: any, title: string, id: any) => {
            setShowTag(false);
            let mentionUserIds = [];
            if (id === 'All') {
              // メンション先のユーザ情報（ルームメンバー全員）
              const allMentionUsers = listUserChat.map((el: any) => ({
                userId: el.id,
                userName: el.last_name + el.first_name,
              }));
              // メンション先のユーザID（ルームメンバー全員）
              mentionUserIds = allMentionUsers.map(
                (user: {[x: string]: any}) => user.userId,
              );
              setListUserSelect(allMentionUsers);
            } else {
              // メンション先のユーザID（指定ユーザ）
              mentionUserIds = [id];
              // メンション先のユーザ情報（指定ユーザ）
              listUserSelect.push({
                userId: id,
                userName: value,
              });
              setListUserSelect(listUserSelect);
            }
            // メンション通知を送る対象のユーザID
            setIds(ids?.concat(mentionUserIds));

            if (value) {
              // 敬称名
              const honorificTitle = value + title;
              // メンション先に追加
              mentionedUsers.push('@' + honorificTitle);
              mentionedUsers.push('@' + value);
              // 現在のカーソル位置を取得
              const cursorPosition = textSelection.start;
              // カーソル位置より前のテキストを取得
              const textBeforeCursor = inputText.slice(0, cursorPosition);
              // @より前の文字列を切り出す
              const lastAtIndex = textBeforeCursor.lastIndexOf('@');
              let substTxt = "";

              if (lastAtIndex !== -1) {
                substTxt = inputText.slice(0, lastAtIndex);
              }
              // @の入力位置より後の文字を切り出す
              const after = inputText.slice(inputIndex, inputText.length);
              // 切り出した前後の文字列を@敬称名に結合することで入力した@をメンション先氏名に置換する
              const replacedText = `${substTxt} @${honorificTitle} ${after}`;
              formatText(replacedText, true);
              setInputText(replacedText);
            }
          }}
        />
      );
    }

    if (isShowModalStamp) {
      return (
        <ModalStamp
          onChose={(value: any) => {
            sendLabel(value);
          }}
        />
      );
    }

    if (isShowDecoButtons) {
      return <DecoButton onDecoSelected={onDecoSelected} />;
    }

    return null;
  }, [
    isShowTagModal,
    isShowModalStamp,
    isShowDecoButtons,
    idRoomChat,
    setShowTag,
    setIds,
    ids,
    listUserChat,
    setListUserSelect,
    listUserSelect,
    mentionedUsers,
    inputText,
    inputIndex,
    formatText,
    setInputText,
    sendLabel,
    onDecoSelected,
  ]);

  //Check phạm vi để gọi hàm loadmore
  const isCloseToTop = useCallback(
    ({layoutMeasurement, contentOffset, contentSize}: any) => {
      const paddingToTop = IS_IOS ? -20 : 10;
      return (
        contentSize.height - layoutMeasurement.height - paddingToTop <=
        contentOffset.y
      );
    },
    [],
  );

  //Check vị trí scroll màn hình đang ở index số mấy
  const onViewRef = useRef((viewableItems: any) => {
    const index = viewableItems?.viewableItems?.length - 1;
    setIndex(viewableItems?.viewableItems[index]?.index);
  });

  //Config view xem trong tài liệu của RN
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 0,
  });

  useEffect(() => {
    if (mentionQuery === '@') {
      setShowTag(true);
    } else if (mentionQuery) {
      const filtered = listUserChat.filter((user: any) => {
        const fullName = user.last_name + user.first_name;
        return fullName.includes(mentionQuery);
      });
      const isFind = filtered.length > 0;
      if (isFind) {
        setShowTag(true);
      }
    }
  }, [mentionQuery, listUserChat]);

  const onInputSizeChanged = (size: {width: number; height: number}) => {
    const newComposerHeight = Math.max(
      MIN_COMPOSER_HEIGHT,
      Math.min(MAX_COMPOSER_HEIGHT, size.height),
    );
    const newMessagesContainerHeight =
      giftedChatRef.current._keyboardHeight > 0
        ? giftedChatRef.current.getMessagesContainerHeightWithKeyboard(
            newComposerHeight,
          )
        : giftedChatRef.current.getBasicMessagesContainerHeight(
            newComposerHeight,
          );

    giftedChatRef.current.setState({
      composerHeight: newComposerHeight,
      messagesContainerHeight: newMessagesContainerHeight,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{height: '100%'}}>
        <Header
          back
          //Check title header nếu đây là chat 1-1 hay chat nhóm
          title={
            dataDetail?.name && dataDetail?.name?.length > 0
              ? dataDetail?.name
              : `${
                  dataDetail?.one_one_check &&
                  dataDetail?.one_one_check?.length > 0
                    ? dataDetail?.one_one_check[0]?.last_name
                    : ''
                } ${
                  dataDetail?.one_one_check &&
                  dataDetail?.one_one_check?.length > 0
                    ? dataDetail?.one_one_check[0]?.first_name
                    : ''
                }`
          }
          imageCenter
          iconRightFirst={iconDetail}
          iconRightSecond={iconSearch}
          styleIconRightFirst={[styles.colorIcon, styles.size]}
          styleIconRightSeccond={styles.colorIcon}
          onRightFirst={navigateToDetail}
          sourceImageCenter={
            dataDetail?.one_one_check?.length > 0
              ? dataDetail?.one_one_check[0]?.icon_image
              : dataDetail?.icon_image
          }
          onRightSecond={searchMessage}
          customBack={customBack}
          mute={mute}
        />
        {/* UI pin message */}
        {message_pinned?.id && (
          <ModalPin
            updateGimMessage={(id: any, value: any) =>
              updateGimMessage(id, value)
            }
          />
        )}

        {/* UI list chat message */}
        <GiftedChat
          keyboardShouldPersistTaps={'handled'}
          ref={giftedChatRef}
          onInputTextChanged={txt => {
            formatText(txt, false);
            setInputText(txt);

            // 現在のカーソル位置を取得
            const cursorPosition = textSelection.start;
            // カーソル位置より前のテキストを取得
            const textBeforeCursor = txt.slice(0, cursorPosition);
            // 最後に出現した@マークのインデックスを取得
            const lastAtIndex = textBeforeCursor.lastIndexOf('@');

            let substTxt = '';
            // @マークが存在する場合、その後の文字列を取得
            if (lastAtIndex !== -1) {
              substTxt = textBeforeCursor.slice(lastAtIndex, cursorPosition);
            }

            // テキストに@マークが含まれる場合の処理
            if (txt.includes('@')) {
              // 最初に@マークをクエリに設定
              setMentionQuery('@');
              // @マーク以降の文字列を取得してクエリに設定
              const mention = txt.split('@').pop();
              setMentionQuery(mention || '');
              
              // substTxtが空または@のみの場合の処理
              if (!substTxt || substTxt === '@') {
                setMentionQuery('@');
              }
              // substTxtに@が含まれる場合、その後の文字列をクエリに設定
              else if (substTxt.includes('@')) {
                const mention = substTxt.split('@').pop();
                setMentionQuery(mention || '');
              }
            }

            // 条件に合致する場合、クエリをリセットしてタグ表示をオフにする
            if (
              (txt == substTxt && !txt.includes('@'))
              || (!substTxt && !txt.includes('@'))
            ) {
              setMentionQuery('');
              setShowTag(false);
            }

          }}
          messages={convertedMessageList}
          onSend={sendMessage}
          alwaysShowSend={true}
          renderMessage={renderMessage}
          renderInputToolbar={inputProps =>
            renderInputToolbar({...inputProps, ref: inputRef, isShowKeyboard})
          }
          renderComposer={composerProps =>
            renderComposer({
              toggleDecoButtons,
              formattedText,
              showModalStamp,
              setDefaultMinHeightInput,
              minHeightInput,
              isShowModalStamp: isShowModalStamp,
              onInputTextChanged: txt => {
                formatText(txt, false);
                setInputText(txt);
              },
              ...composerProps,
              onInputSizeChanged,
              composerRef,
            })
          }
          wrapInSafeArea={false}
          user={chatUser}
          renderSend={renderSend}
          renderActions={renderActions}
          maxComposerHeight={MAX_COMPOSER_HEIGHT}
          minComposerHeight={MIN_COMPOSER_HEIGHT}
          minInputToolbarHeight={52}
          //Các props của flatlist nhúng vào gifted chat
          listViewProps={{
            scrollEventThrottle: 400,
            //Xử lý loadmore tin nhắn
            onScroll: ({nativeEvent}: any) => {
              if (isCloseToTop(nativeEvent)) {
                onLoadMore();
              } else if (nativeEvent?.contentOffset?.y === 0) {
                onLoadMoreDown();
              }
            },

            //Xử lý tracking xem đang scroll ở vị trí tin nhắn số bao nhiêu
            viewabilityConfig: viewConfigRef.current,
            onViewableItemsChanged: onViewRef.current,

            //Xử lý khi vào màn detail chat sẽ nhảy đến message được chỉ định
            onScrollToIndexFailed: (info: any) => {
              if (info?.index >= 0) {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex(
                    {
                      animated: true,
                      index: info?.index,
                    },
                  );
                });
              }
            },
          }}
          //Các props của textInput nhúng vào gifted chat
          textInputProps={{
            onTextInput: ({nativeEvent}: any) => {
              if (nativeEvent.text === '@') {
                showModalTagName();
              };
            },
            onSelectionChange: ({nativeEvent}: any) => {
              textSelection.start = nativeEvent.selection.start;
              textSelection.end = nativeEvent.selection.end;
              setInputIndex(nativeEvent.selection.start);
            },
          }}
          renderFooter={() => (
            <View
              style={footerStyles(accessoryHeight, isShowKeyboard).footerView}
            />
          )}
          //Chú ý đây là phần xử lý các UI nằm bên trên của input chat (có custom trong thư viện)
          renderAccessory={() => {
            return (
              <View
                onLayout={event =>
                  setAccessoryHeight(event.nativeEvent.layout.height)
                }>
                {renderAccessoryModals()}

                {messageReply || messageEdit || messageQuote ? (
                  <>
                    {/* UI reply message */}
                    {messageReply && <ModalReply />}
                    {/* UI Edit message */}
                    {messageEdit && <ModalEdit />}
                    {/* UI message quote */}
                    {messageQuote && <ModalQuote />}
                  </>
                ) : undefined}
              </View>
            );
          }}
          bottomOffset={0}
          messagesContainerStyle={styles.containerMessage}
        />

        {chosenFiles.length > 0 && (
          <ShowPickedFile chosenFiles={chosenFiles} deleteFile={deleteFile} />
        )}
      </View>

      {/* UI modal chọn ảnh, video và file */}
      <ModalPickFile
        visible={pickFile}
        onCancel={cancelModal}
        chosePhoto={chosePhoto}
        choseFile={choseFile}
      />
      {partCopy && (
        <View style={styles.viewPartCopy}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.viewPartCopyOverlay,
              {alignItems: partCopy.me ? 'flex-end' : 'flex-start'},
            ]}
            onPress={() => changePartCopy(null)}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <LinearGradient
                colors={partCopy.colors}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.containerChat}>
                <TextInput
                  editable={IS_ANDROID}
                  multiline
                  scrollEnabled={true}
                  selectTextOnFocus={true}
                  showSoftInputOnFocus={false}
                  style={styles.partCopyText}
                  value={partCopy.text}
                  onChangeText={() => {
                    Keyboard.dismiss();
                    changePartCopy(partCopy);
                  }}
                />
              </LinearGradient>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export {DetailChat};
