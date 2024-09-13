import {useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import {Keyboard, KeyboardEvent, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

import {
  deleteMessage,
  editMessageAction,
  fetchResultMessageActionListRoom,
  getDetailListChat,
  getDetailMessageSocketSuccess,
  getListUserChat,
  pinMessage,
  resetDataChat,
  saveIdMessageSearch,
  saveIdRoomChat,
  saveIsGetInfoRoom,
  saveListUserChat,
  saveMessageEdit,
  saveMessageQuote,
  saveMessageReply,
  updateMuteStatusRoom,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  GlobalService,
  addBookmark,
  callApiChatBot,
  deleteMessageApi,
  detailRoomchat,
  editMessageApi,
  pinMessageApi,
  replyMessageApi,
  sendMessageErrorLog,
  sendLabelApi,
  sendMessageApi,
  sendReactionApi,
} from '@services';
import {AppSocket, IS_IOS, MESSAGE_RANGE_TYPE, convertArrUnique} from '@util';

import {store} from '../../../redux/store';

interface partCopyType {
  me: boolean;
  colors: Array<string>;
  text: string;
}

export const useFunction = (props: any) => {
  const {getSocket} = AppSocket;
  const socket = getSocket();

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const {route} = props;
  const {idRoomChat, idMessageSearchListChat, messId} = route?.params;

  const giftedChatRef = useRef<any>(null);

  const me = useSelector((state: any) => state.auth.userInfo);
  const userId = useSelector((state: any) => state.auth.userInfo?.id);
  const listChat = useSelector((state: any) => state.chat?.detailChat);
  const listUserChat = useSelector((state: any) => state.chat?.listUserChat);
  const paging = useSelector((state: any) => state.chat?.pagingDetail);
  const message_pinned = useSelector(
    (state: any) => state.chat?.message_pinned,
  );
  const messageEdit = useSelector((state: any) => state.chat?.messageEdit);
  const messageReply = useSelector((state: any) => state.chat?.messageReply);
  const messageQuote = useSelector((state: any) => state.chat?.messageQuote);
  const idMessageSearch = useSelector(
    (state: any) => state.chat?.id_messageSearch,
  );
  const isGetInfoRoom = useSelector((state: any) => state.chat?.isGetInfoRoom);
  const redLineId = useSelector((state: any) => state.chat?.redLineId);

  const [idRoom, setIdRoom] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [dataDetail, setData] = useState<any>(null);
  const [page, setPage] = useState<number | null>(1);
  const [topPage, setTopPage] = useState<number | null>(1);
  const [bottomPage, setBottomPage] = useState<number | null>(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [pickFile, setPickFile] = useState(false);
  const [chosenFiles, setChosenFiles] = useState<any[]>([]);
  const [isShowModalStamp, setShowModalStamp] = useState(false);
  const [text, setText] = useState('');
  const [formattedText, setFormattedText] = useState<(string | JSX.Element)[]>(
    [],
  );
  const [isShowTagModal, setShowTag] = useState(false);
  const [ids, setIds] = useState<any[]>([]);
  const [newIndexArray, setIndex] = useState<any>(null);
  const [listUserSelect, setListUserSelect] = useState<any[]>([]);
  const [mentionedUsers, setMentionedUsers] = useState<any[]>([]);
  const [showRedLine, setShowRedLine] = useState(true);
  const [idRedLine, setIdRedLine] = useState<number | null>(null);
  const [indexRedLine, setIndexRedLine] = useState<number | null>(null);
  const [partCopy, setPartCopy] = useState<partCopyType | null>(null);
  const [inputText, setInputText] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [textSelection, setTextSelection] = useState<any>({start: 0, end: 0});
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [isShowDecoButtons, setIsShowDecoButtons] = useState(false);
  const [accessoryHeight, setAccessoryHeight] = useState(0);
  const [allowMoveToRedLine, setAllowMoveToRedLine] = useState(true);

  // deeplinkを追加したためログイン前に来ることがあるのでその対応
  // meが存在するかの確認をfetch前に行うことが必要
  useLayoutEffect(() => {
    if (!me) {
      navigation.navigate({name: ROUTE_NAME.LOGIN});
    }
  }, [me, navigation]);

  // メッセージが存在するページをfetch
  const fetchMessageSearch = useCallback(
    idMessage => {
      setTimeout(async () => {
        const body = {
          id_room: idRoomChat,
          id_message: idMessage,
        };
        await dispatch(fetchResultMessageActionListRoom(body));
      }, 1000);
    },
    [idRoomChat, dispatch],
  );

  // 返信・引用のオリジナルメッセージのタップ
  const navigateToMessage = useCallback(
    idMessage => {
      GlobalService.showLoading();
      dispatch(saveIdMessageSearch(idMessage));
      setPageLoading(true);
    },
    [dispatch],
  );

  const navigateToDetail = useCallback(() => {
    navigation.navigate(ROUTE_NAME.INFO_ROOM_CHAT, {idRoomChat: idRoomChat});
  }, [idRoomChat, navigation]);

  const convertDataMessage = useCallback(
    (message: any, index: number) => ({
      _id: message?.id,
      text: message?.message,
      createdAt: message?.created_at,
      user: {
        _id: message?.from_id,
        avatar: message?.user_send?.icon_image,
        name: message?.user_send
          ? `${message?.user_send?.last_name}${message?.user_send?.first_name}`
          : null,
        addition: message?.user_send?.addition,
      },
      reaction: message?.reactions,
      msg_type: message?.msg_type,
      reply_to_message_text: message?.reply_to_message_text,
      attachment_files: message?.attachment_files,
      reply_to_message_files: message?.reply_to_message_files,
      reply_to_message_stamp: message?.reply_to_message_stamp,
      stamp_icon: message?.stamp_icon,
      reply_to_message_id: message?.reply_to_message_id,
      reply_to_message_user: message?.reply_to_message_user,
      reply_to_message_user_id: message?.reply_to_message_user_id,
      stamp_no: message?.stamp_no,
      index,
      users_seen: message?.users_seen,
      task: message?.task,
      task_message: message?.task_message,
      task_link: message?.task_link,
      message_quote: message?.message_quote,
      updated_at: message?.updated_at,
      quote_message_id: message?.quote_message_id,
      quote_message_user: message?.quote_message_user,
      quote_message_user_id: message?.quote_message_user_id,
    }),
    [],
  );

  const generateDatabaseDateTime = useCallback(date => {
    return date.toLocaleString().replace('T', ' ').substring(0, 19);
  }, []);

  const makeTemporallyDataMessage = useCallback(
    (tempData: any) => {
      let dateNow = new Date();
      const currentDatetime = generateDatabaseDateTime(dateNow);
      return [
        {
          id: 9999999999,
          room_id: tempData.room_id,
          from_id: tempData.from_id,
          user_send: {},
          message: tempData.message,
          type: null,
          msg_level: 0,
          msg_type: 0,
          message_quote: null,
          quote_message_id: null,
          quote_message_user: null,
          method: 0,
          stamp_no: null,
          stamp_icon: '',
          medthod: 0,
          created_at: currentDatetime,
          updated_at: currentDatetime,
          reactions: [],
          del_flag: '0',
          reply_to_message_id: tempData.reply_to_message_id,
          reply_to_message_text: null,
          reply_to_message_user: null,
          reply_to_message_user_id: null,
          reply_to_message_files: [],
          reply_to_message_stamp: {stamp_no: null, stamp_icon: null},
          task: null,
          task_message: null,
          task_link: null,
          attachment_files: [],
          users_seen: [],
        },
      ];
    },
    [generateDatabaseDateTime],
  );

  const convertedMessageList = useMemo(
    () =>
      (listChat ?? []).map((item: any, index: number) =>
        convertDataMessage(item, index),
      ),
    [listChat, convertDataMessage],
  );

  const chatUser = useMemo(() => {
    return {
      _id: userId,
    };
  }, [userId]);

  const getListChat = useCallback(
    async nextPage => {
      const data = {
        id: idRoomChat,
        page: nextPage,
      };
      await dispatch(getDetailListChat(data));
      setPage(nextPage);
    },
    [idRoomChat, dispatch],
  );

  const getDetail = useCallback(async () => {
    try {
      const response = await detailRoomchat(idRoomChat);
      setData(response?.data?.room);
      dispatch(saveIsGetInfoRoom(false));
      dispatch(updateMuteStatusRoom(response?.data?.room.mute_flag === 1));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        navigation.pop(1);
      }
    }
  }, [idRoomChat, dispatch, navigation]);

  const onShowMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const deleteMsg = useCallback(
    async (id: any) => {
      try {
        setShowRedLine(false);
        GlobalService.showLoading();
        const res = await deleteMessageApi(id, idRoomChat);
        socket.emit('message_ind2', {
          user_id: userId,
          room_id: idRoomChat,
          task_id: null,
          to_info: null,
          level: res?.data?.message_id?.msg_level,
          message_id: res?.data?.message_id?.id,
          message_type: res?.data?.message_id?.msg_type,
          method: 2,
          // attachment_files: res?.data?.attachmentFiles,
          stamp_no: res?.data?.message_id?.stamp_no,
          relation_message_id: res?.data?.message_id?.reply_to_message_id,
          text: res?.data?.message_id?.message,
          text2: null,
          time: res?.data?.message_id?.created_at,
        });
        dispatch(deleteMessage(id));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        GlobalService.hideLoading();
      }
    },
    [idRoomChat, dispatch, socket, userId],
  );

  const updateGimMessage = useCallback(
    async (id, status) => {
      try {
        await pinMessageApi(id, status);
        if (status === 0) {
          dispatch(pinMessage(null));
        } else {
          getListChat(page);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [dispatch, getListChat, page],
  );

  const getCurrentPage = useCallback(() => {
    const currentPage = paging?.current_page ?? 1;
    if (!page) {
      setPage(currentPage);
    }
    if (!topPage || topPage < currentPage) {
      setTopPage(currentPage);
    }
    if (!bottomPage || bottomPage > currentPage) {
      setBottomPage(currentPage);
    }
    return currentPage;
  }, [paging?.current_page, page, topPage, bottomPage]);

  const onLoadMore = useCallback(() => {
    const currentPage = getCurrentPage();
    const nextPage = Math.max(
      topPage ? topPage + 1 : currentPage + 1,
      currentPage + 1,
    );
    if (nextPage > paging?.last_page) {
      return;
    }
    setPage(nextPage);
    setTopPage(nextPage);
    setPageLoading(true);
  }, [getCurrentPage, topPage, paging?.last_page]);

  const onLoadMoreDown = useCallback(() => {
    const currentPage = getCurrentPage();
    if (currentPage === 1 || bottomPage === 1) {
      return;
    }
    const nextPage = bottomPage
      ? Math.max(bottomPage - 1, 1)
      : Math.max(currentPage - 1, 1);
    setPage(nextPage);
    setBottomPage(nextPage);
    setPageLoading(true);
  }, [bottomPage, getCurrentPage]);

  const replyMessage = useCallback(
    (data: any) => {
      dispatch(saveMessageReply(data));
    },
    [dispatch],
  );

  const removeQuoteMessage = useCallback(() => {
    dispatch(saveMessageQuote(null));
  }, [dispatch]);

  const removeReplyMessage = useCallback(() => {
    dispatch(saveMessageReply(null));
  }, [dispatch]);

  const quoteMessage = useCallback(
    (data: any) => {
      dispatch(saveMessageQuote(data));
    },
    [dispatch],
  );

  const checkDeletedMension = useCallback(
    (formattedText1: any[]) => {
      let result = false;
      formattedText1.forEach((element, index) => {
        if (
          element?.props?.children?.startsWith('@') &&
          element?.props?.children?.length > 1 &&
          element?.props?.children?.length <
            formattedText[index]?.props?.children.length
        ) {
          result = true;
        }
      });
      return result;
    },
    [formattedText],
  );

  const callApiChatBotRequest = useCallback(
    async (message: any, messageId: any) => {
      try {
        const numberOfMember = listUserChat?.length ?? 0;
        let mentionMembers: {userId: number; userName: string}[] = [];
        if (numberOfMember < 1) {
          return null;
        } else if (numberOfMember === 1) {
          // 個別チャットでは常に送信対象
          mentionMembers = [
            {
              userId: listUserChat[0].id,
              userName: listUserChat[0].last_name + listUserChat[0].first_name,
            },
          ];
        } else if (numberOfMember > 1) {
          // グループチャットではメンションのみ送信対象
          if (inputText.indexOf('@all') > -1) {
            mentionMembers = listUserChat.map(el => ({
              userId: el.id,
              userName: `${el.last_name}${el.first_name}`,
            }));
          } else {
            mentionMembers = listUserSelect.filter(el => {
              return inputText.indexOf(`@${el.userName}`) > -1;
            });
          }
        }
        const formData = new FormData();
        formData.append('from_user_name', `${me.last_name}${me.first_name}`);
        formData.append(
          'mention_members',
          JSON.stringify(convertArrUnique(mentionMembers, 'userId')),
        );
        formData.append('message', escapeHtml(message));
        formData.append('message_id', messageId);
        formData.append('room_id', idRoomChat);
        await callApiChatBot(formData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [idRoomChat, listUserChat, listUserSelect, me, inputText],
  );

  /**
   * メッセージ内のHTMLタグや特殊文字をサニタイズし、改行を正規化
   *
   * @param message サニタイズする文字列
   * @returns サニタイズされた文字列
   */
  const escapeHtml = (message: string): string =>
    message
      .replace(/<br>/g, '\n')
      .replace(/<br\/>/g, '\n')
      .replace(/<br \/>/g, '\n')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\r\n|\n|\r/g, '<br>');

  /**
   * format method
   * @param inputText
   * @param fromTagFlg
   */
  const formatText = useCallback(
    (input: string, fromTagFlg: boolean) => {
      if (input.length === 0) {
        setFormattedText([]);
        return;
      }
      const words = input.split(' ');
      const newWords: string[] = [];
      words.forEach(word => {
        if (word.match('.+\n.+')) {
          const splitNewWord = word.split('\n');
          splitNewWord.forEach((s, index) => {
            if (index > 0) {
              newWords.push('\n');
            }
            newWords.push(s);
          });
        } else if (word.match('.+\n')) {
          const splitNewWord = word.split('\n');
          splitNewWord.forEach(s => {
            if (s !== '') {
              newWords.push(s);
            } else {
              newWords.push('\n');
            }
          });
        } else if (word.match('\n.+')) {
          newWords.push(word);
        } else if (word.match('　')) {
          const splitNewWord = word.split('　');
          splitNewWord.forEach((s, index) => {
            if (index > 0) {
              newWords.push(' ');
            }
            newWords.push(s);
          });
        } else {
          newWords.push(word);
        }
      });
      const formattedText1: (string | JSX.Element)[] = [];
      words.forEach((word, index) => {
        const isLastWord = index === words.length - 1;
        const includingList = mentionedUsers.filter((el: string) => {
          var re = new RegExp('^' + el + '', 'gi');
          var result = re.test(word);
          if (result) {
            return true;
          }
          return false;
        });
        if (!word.startsWith('@') || includingList.length === 0) {
          const nonmention = (
            <Text
              key={word + index}
              style={{
                alignSelf: 'flex-start',
                color: 'black',
              }}>
              {word}
            </Text>
          );
          return isLastWord
            ? formattedText1.push(nonmention)
            : formattedText1.push(nonmention, ' ');
        } else {
          const mention = (
            <Text
              key={word + index}
              style={{
                alignSelf: 'flex-start',
                color: '#3366CC',
                fontWeight: 'bold',
              }}>
              {word}
            </Text>
          );
          if (word === '@') {
            formattedText1.push(mention);
          } else {
            if (word.startsWith('@') && !word.includes(' ') && !fromTagFlg) {
              isLastWord
                ? formattedText1.push(mention)
                : formattedText1.push(mention, ' ');
            } else {
              isLastWord
                ? formattedText1.push(mention, ' ')
                : formattedText1.push(mention, ' ');
            }
          }
        }
      });
      if (checkDeletedMension(formattedText1)) {
        formattedText1.unshift(' '); //i put space in beggining because text color cant be changed without this.
      }
      setFormattedText(formattedText1);
    },
    [checkDeletedMension, mentionedUsers],
  );

  const getText = (formattedtext: (string | JSX.Element)[]) => {
    let context: string = '';
    formattedtext.forEach(element => {
      let word = '';
      if (typeof element === 'string') {
        word = element;
      } else {
        word = element.props.children;
      }
      if (word !== '@') {
        if (word.slice(-1) === '@') {
          context = context + word.slice(0, -1) + ' ';
        } else {
          context = context + word;
        }
      }
    });
    return context;
  };

  const editMessage = useCallback(
    (data: any) => {
      // setText(data?.text);
      formatText(data?.text + ' ', false);
      dispatch(saveMessageEdit(data));
    },
    [dispatch, formatText],
  );

  const removeEditMessage = useCallback(() => {
    dispatch(saveMessageEdit(null));
  }, [dispatch]);

  const reactionMessage = useCallback(
    async (data, id) => {
      setShowRedLine(false);
      const body = {
        message_id: id,
        reaction_no: data,
      };
      const res = await sendReactionApi(body);
      socket.emit('message_ind2', {
        user_id: userId,
        room_id: idRoomChat,
        task_id: null,
        to_info: null,
        level: res?.data?.data?.msg_level,
        message_id: id,
        message_type: 3,
        method: 0,
        attachment_files: res?.data?.attachmentFiles,
        stamp_no: data,
        relation_message_id: res?.data?.data?.id,
        text: res?.data?.data?.message,
        text2: null,
        time: res?.data?.data?.created_at,
      });
      const joinUsers = listUserChat?.map(el => {
        return {userId: el.id, userName: el.last_name + el.first_name};
      });
      const toInfo = {
        type: MESSAGE_RANGE_TYPE.USER,
        ids: listUserChat?.map(el => el.id),
      };
      socket.emit('notification_ind2', {
        user_id: userId,
        room_id: idRoomChat,
        room_name: dataDetail?.name,
        join_users: joinUsers,
        user_name:
          res?.data?.data?.user_send?.last_name +
          res?.data?.data?.user_send?.first_name,
        user_icon_url: res?.data?.data?.icon_image ?? null,
        client_name: listUserChat[0]?.client_name ?? null,
        message_text: res?.data?.data?.message,
        attachment: null,
        stamp_no: res?.data?.data?.stamp_no,
        to_info: toInfo,
      });
      dispatch(
        editMessageAction({id: res?.data?.data?.id, data: res?.data?.data}),
      );
    },
    [dispatch, idRoomChat, socket, userId, dataDetail, listUserChat],
  );

  const navigatiteToListReaction = useCallback(
    idMsg => {
      navigation.navigate(ROUTE_NAME.LIST_REACTION, {
        id: idMsg,
        room_id: idRoomChat,
      });
    },
    [idRoomChat, navigation],
  );

  const cancelModal = useCallback(() => {
    setPickFile(!pickFile);
  }, [pickFile]);

  const chosePhoto = () => {
    setShowRedLine(false);
    ImagePicker.openPicker({
      multiple: true,
    }).then(async images => {
      if (images?.length > 3) {
        cancelModal();
        showMessage({
          message: 'Maximum of 3 photos',
          type: 'danger',
        });
      } else {
        cancelModal();
        const mergedFiles = images.concat(chosenFiles);
        setChosenFiles(mergedFiles);
      }
    });
  };

  const choseFile = () => {
    setShowRedLine(false);
    DocumentPicker.pickMultiple({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    }).then(async file => {
      cancelModal();
      const mergedFiles = file.concat(chosenFiles);
      setChosenFiles(mergedFiles);
    });
  };

  const sendFile = useCallback(
    async (callChatBot: boolean) => {
      try {
        if (chosenFiles.length > 0) {
          GlobalService.showLoading();
          // send files
          for (const item of chosenFiles) {
            const data = new FormData();
            if (item?.sourceURL || item?.path) {
              // in case of image
              const isHEIC =
                item?.sourceURL?.endsWith('.heic') ||
                item?.sourceURL?.endsWith('.HEIC') ||
                item?.path?.endsWith('.HEIC') ||
                item?.path?.endsWith('.HEIC');
              data.append('attachment[]', {
                fileName: item?.path?.replace(/^.*[\\/]/, ''),
                name: item?.path?.replace(/^.*[\\/]/, ''),
                width: item?.width,
                uri: item?.path,
                path: item?.path,
                size: item?.size,
                type: IS_IOS
                  ? `image/${
                      isHEIC
                        ? item?.path?.split('.')[0] + '.JPG'
                        : item?.path?.split('.').pop()
                    }}`
                  : item?.mime,
                height: item?.height,
              });
              data.append('msg_type', 2);
              data.append('room_id', idRoomChat);
              data.append('from_id', userId);
            } else {
              // in case of file
              data.append('attachment[]', {
                name: item?.name,
                type: item?.type,
                uri: IS_IOS
                  ? decodeURIComponent(item?.uri?.replace('file://', ''))
                  : decodeURIComponent(item?.fileCopyUri),
              });
              data.append('msg_type', 2);
              data.append('room_id', idRoomChat);
              data.append('from_id', userId);
            }
            const res = await sendMessageApi(data);
            socket.emit('message_ind2', {
              user_id: userId,
              room_id: idRoomChat,
              task_id: null,
              to_info: null,
              level: res?.data?.data?.msg_level,
              message_id: res?.data?.data?.id,
              message_type: res?.data?.data?.msg_type,
              method: res?.data?.data?.method,
              attachment_files: res?.data?.attachmentFiles,
              stamp_no: res?.data?.data?.stamp_no,
              relation_message_id: res?.data?.data?.reply_to_message_id,
              text: res?.data?.data?.message,
              text2: null,
              time: res?.data?.data?.created_at,
            });
            dispatch(getDetailMessageSocketSuccess([res?.data?.data]));
            if (callChatBot) {
              await callApiChatBotRequest(
                res?.data?.data?.message,
                res?.data?.data?.id,
              );
            }
            giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex(
              {
                animated: true,
                index: 0,
              },
            );
          }
          setChosenFiles([]);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        GlobalService.hideLoading();
      }
    },
    [chosenFiles, dispatch, idRoomChat, socket, userId, callApiChatBotRequest],
  );

  const sendLabel = async (stamp_no: any) => {
    setShowTag(false);
    setShowModalStamp(false);
    setShowRedLine(false);
    try {
      const data = new FormData();
      data.append('room_id', idRoomChat);
      data.append('from_id', userId);
      data.append('msg_level', 0);
      data.append('msg_type', 1);
      data.append('method', 0);
      data.append('stamp_no', stamp_no);
      const res = await sendLabelApi(data);
      socket.emit('message_ind2', {
        user_id: userId,
        room_id: idRoomChat,
        task_id: null,
        to_info: null,
        level: res?.data?.data?.msg_level,
        message_id: res?.data?.data?.id,
        message_type: res?.data?.data?.msg_type,
        method: res?.data?.data?.method,
        attachment_files: res?.data?.attachmentFiles,
        stamp_no: res?.data?.data?.stamp_no,
        relation_message_id: res?.data?.data?.reply_to_message_id,
        text: res?.data?.data?.message,
        text2: null,
        time: res?.data?.data?.created_at,
      });
      const joinUsers = listUserChat?.map(el => {
        return {userId: el.id, userName: el.last_name + el.first_name};
      });
      const toInfo = {
        type: MESSAGE_RANGE_TYPE.USER,
        ids: listUserChat?.map(el => el.id),
      };
      socket.emit('notification_ind2', {
        user_id: userId,
        room_id: idRoomChat,
        room_name: dataDetail?.name,
        join_users: joinUsers,
        user_name:
          res?.data?.data?.user_send?.last_name +
          res?.data?.data?.user_send?.first_name,
        user_icon_url: res?.data?.data?.icon_image ?? null,
        client_name: listUserChat[0]?.client_name ?? null,
        message_text: res?.data?.data?.message,
        attachment: null,
        stamp_no: res?.data?.data?.stamp_no,
        to_info: toInfo,
      });
      dispatch(getDetailMessageSocketSuccess([res?.data?.data]));
      await callApiChatBotRequest(
        res?.data?.data?.message,
        res?.data?.data?.id,
      );
      giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex({
        animated: true,
        index: 0,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const searchMessage = useCallback(() => {
    navigation.navigate(ROUTE_NAME.SEARCH_MESSAGE, {idRoomChat: idRoomChat});
  }, [idRoomChat, navigation]);

  const removeMessageModals = useCallback(() => {
    if (messageReply) {
      removeReplyMessage();
    }
    if (messageEdit) {
      removeEditMessage();
    }
    if (messageQuote) {
      removeQuoteMessage();
    }
  }, [
    messageQuote,
    messageEdit,
    messageReply,
    removeEditMessage,
    removeReplyMessage,
    removeQuoteMessage,
  ]);

  const showModalStamp = useCallback(() => {
    if (!isShowModalStamp) {
      if (isShowTagModal) {
        setShowTag(false);
      }

      Keyboard.dismiss();
      removeMessageModals();
    }

    setShowModalStamp(!isShowModalStamp);
  }, [isShowModalStamp, isShowTagModal, removeMessageModals]);

  const showModalTagName = useCallback(() => {
    if (isShowModalStamp) {
      setShowModalStamp(false);
    }

    setShowTag(true);
  }, [isShowModalStamp]);

  const toggleDecoButtons = useCallback(() => {
    if (!isShowDecoButtons) {
      if (isShowTagModal) {
        setShowTag(false);
      }
      if (isShowModalStamp) {
        setShowModalStamp(false);
      }
    }
    setIsShowDecoButtons(prev => !prev);
  }, [isShowDecoButtons, isShowModalStamp, isShowTagModal]);

  const getUserListChat = useCallback(async () => {
    try {
      if (!idRoomChat) {
        throw new Error('idRoomChat is undefined.');
      }
      await dispatch(getListUserChat({room_id: idRoomChat}));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [idRoomChat, dispatch]);

  const bookmarkMessage = useCallback(async (data: any) => {
    try {
      GlobalService.showLoading();
      await addBookmark(data);
      showMessage({
        message: 'ブックマークが正常に追加されました',
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      GlobalService.hideLoading();
    }
  }, []);

  const sendMessageError = async (error: any, message: any) => {
    if (error instanceof Error) {
      const errorData = {
        user_id: user_id,
        room_id: idRoomChat,
        message_text: message,
        error_message: error.message,
        device_info: navigation.userAgent || '',
        network_status: navigation.onLine ? 'online' : 'offline',
      };
      await sendMessageErrorLog(errorData);
    }
  };

  const sendMessage = useCallback(
    async mes => {
      if (isSendingMessage) {
        return;
      }
      setShowTag(false);
      setShowModalStamp(false);
      setShowRedLine(false);
      setIsSendingMessage(true);
      if (messageReply) {
        try {
          // 現在表示中のルームIDと返信元のルームIDが違う場合はエラー
          if (messageReply?.roomId !== idRoomChat) {
            showMessage({
              message: 'ルームIDが違います',
              type: 'danger',
            });
            return;
          }
          const data = new FormData();
          data.append('room_id', idRoomChat);
          data.append('from_id', userId);
          data.append('message', mes[0]?.text?.split('\n').join('<br>'));
          data.append('reply_to_message_id', messageReply?.id);
          ids?.forEach((item: any) => {
            data.append('ids[]', item);
          });
          // at first show temporally data
          const tempData = {
            room_id: idRoomChat,
            from_id: userId,
            message: mes[0]?.text?.split('\n').join('<br>'),
            reply_to_message_id: messageReply?.id,
          };
          dispatch(saveMessageReply(null));
          dispatch(
            getDetailMessageSocketSuccess(makeTemporallyDataMessage(tempData)),
          );
          const res = await replyMessageApi(data);
          socket.emit('message_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            task_id: null,
            to_info: null,
            level: res?.data?.data?.msg_level,
            message_id: res?.data?.data?.id,
            message_type: res?.data?.data?.msg_type,
            method: res?.data?.data?.method,
            attachment_files: res?.data?.attachmentFiles,
            stamp_no: res?.data?.data?.stamp_no,
            relation_message_id: res?.data?.data?.reply_to_message_id,
            text: res?.data?.data?.message,
            text2: null,
            time: res?.data?.data?.created_at,
          });
          const joinUsers = listUserChat?.map(el => {
            return {userId: el.id, userName: el.last_name + el.first_name};
          });
          const toInfo = {
            type: MESSAGE_RANGE_TYPE.USER,
            ids: listUserChat?.map(el => el.id),
          };
          socket.emit('notification_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            room_name: dataDetail?.name,
            join_users: joinUsers,
            user_name:
              res?.data?.data?.user_send?.last_name +
              res?.data?.data?.user_send?.first_name,
            user_icon_url: res?.data?.data?.icon_image ?? null,
            client_name: listUserChat[0]?.client_name ?? null,
            message_text: res?.data?.data?.message,
            attachment: null,
            stamp_no: res?.data?.data?.stamp_no,
            to_info: toInfo,
          });
          dispatch(saveMessageReply(null));
          // next show real data
          dispatch(getDetailMessageSocketSuccess([res?.data?.data]));
          await callApiChatBotRequest(
            res?.data?.data?.message,
            res?.data?.data?.id,
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            sendMessageError(error, mes[0]?.text);
          }
        }
      } else if (messageEdit) {
        try {
          const param = {
            room_id: idRoomChat,
            message: mes[0]?.text?.split('\n').join('<br>'),
            ids: ids,
          };
          const res = await editMessageApi(messageEdit?.id, param);
          socket.emit('message_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            task_id: null,
            to_info: null,
            level: res?.data?.data?.msg_level,
            message_id: res?.data?.data?.id,
            message_type: res?.data?.data?.msg_type,
            method: res?.data?.data?.method,
            attachment_files: res?.data?.attachmentFiles,
            stamp_no: res?.data?.data?.stamp_no,
            relation_message_id: res?.data?.data?.reply_to_message_id,
            text: res?.data?.data?.message,
            text2: null,
            time: res?.data?.data?.created_at,
            time2: res?.data?.data?.updated_at,
          });
          const joinUsers = listUserChat?.map(el => {
            return {userId: el.id, userName: el.last_name + el.first_name};
          });
          const toInfo = {
            type: MESSAGE_RANGE_TYPE.USER,
            ids: listUserChat?.map(el => el.id),
          };
          socket.emit('notification_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            room_name: dataDetail?.name,
            join_users: joinUsers,
            user_name:
              res?.data?.data?.user_send?.last_name +
              res?.data?.data?.user_send?.first_name,
            user_icon_url: res?.data?.data?.icon_image ?? null,
            client_name: listUserChat[0]?.client_name ?? null,
            message_text: res?.data?.data?.message,
            attachment: null,
            stamp_no: res?.data?.data?.stamp_no,
            to_info: toInfo,
          });
          dispatch(saveMessageEdit(null));
          dispatch(
            editMessageAction({id: res?.data?.data?.id, data: res?.data?.data}),
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            sendMessageError(error, mes[0]?.text);
          }
        }
      } else if (messageQuote) {
        try {
          // 現在表示中のルームIDと引用元のルームIDが違う場合はエラー
          if (messageQuote?.roomId !== idRoomChat) {
            showMessage({
              message: 'ルームIDが違います',
              type: 'danger',
            });
            return;
          }
          const data = new FormData();
          data.append('room_id', idRoomChat);
          data.append('from_id', userId);
          data.append('message', mes[0]?.text?.split('\n').join('<br>'));
          data.append('message_quote', messageQuote?.text);
          data.append('quote_message_id', messageQuote?.id);
          ids?.forEach((item: any) => {
            data.append('ids[]', item);
          });
          const res = await sendMessageApi(data);
          socket.emit('message_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            task_id: null,
            to_info: null,
            level: res?.data?.data?.msg_level,
            message_id: res?.data?.data?.id,
            message_type: res?.data?.data?.msg_type,
            method: res?.data?.data?.method,
            attachment_files: res?.data?.attachmentFiles,
            stamp_no: res?.data?.data?.stamp_no,
            relation_message_id: res?.data?.data?.reply_to_message_id,
            text: res?.data?.data?.message,
            text2: messageQuote?.text,
            time: res?.data?.data?.created_at,
          });
          const joinUsers = listUserChat?.map(el => {
            return {userId: el.id, userName: el.last_name + el.first_name};
          });
          const toInfo = {
            type: MESSAGE_RANGE_TYPE.USER,
            ids: listUserChat?.map(el => el.id),
          };
          socket.emit('notification_ind2', {
            user_id: mes[0]?.user?._id,
            room_id: idRoomChat,
            room_name: dataDetail?.name,
            join_users: joinUsers,
            user_name:
              res?.data?.data?.user_send?.last_name +
              res?.data?.data?.user_send?.first_name,
            user_icon_url: res?.data?.data?.icon_image ?? null,
            client_name: listUserChat[0]?.client_name ?? null,
            message_text: res?.data?.data?.message,
            attachment: null,
            stamp_no: res?.data?.data?.stamp_no,
            to_info: toInfo,
          });
          dispatch(saveMessageQuote(null));
          dispatch(getDetailMessageSocketSuccess([res?.data?.data]));
          await callApiChatBotRequest(
            res?.data?.data?.message,
            res?.data?.data?.id,
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            sendMessageError(error, mes[0]?.text);
          }
        }
      } else { 
        try {
          if (mes[0]?.text) {
            const data = new FormData();
            data.append('room_id', idRoomChat);
            data.append('from_id', mes[0]?.user?._id);
            data.append('message', mes[0]?.text?.split('\n').join('<br>'));
            ids?.forEach((item: any) => {
              data.append('ids[]', item);
            });
            const res = await sendMessageApi(data);
            socket.emit('message_ind2', {
              user_id: mes[0]?.user?._id,
              room_id: idRoomChat,
              task_id: null,
              to_info: null,
              level: res?.data?.data?.msg_level,
              message_id: res?.data?.data?.id,
              message_type: res?.data?.data?.msg_type,
              method: res?.data?.data?.method,
              attachment_files: res?.data?.data?.attachment_files ?? null,
              stamp_no: res?.data?.data?.stamp_no,
              relation_message_id: res?.data?.data?.reply_to_message_id,
              text: res?.data?.data?.message,
              text2: null,
              time: res?.data?.data?.created_at,
            });
            const joinUsers = listUserChat?.map(el => {
              return {userId: el.id, userName: el.last_name + el.first_name};
            });
            const toInfo = {
              type: MESSAGE_RANGE_TYPE.USER,
              ids: listUserChat?.map(el => el.id),
            };
            socket.emit('notification_ind2', {
              user_id: mes[0]?.user?._id,
              room_id: idRoomChat,
              room_name: dataDetail?.name,
              join_users: joinUsers,
              user_name:
                res?.data?.data?.user_send?.last_name +
                res?.data?.data?.user_send?.first_name,
              user_icon_url: res?.data?.data?.icon_image ?? null,
              client_name: listUserChat[0]?.client_name ?? null,
              message_text: res?.data?.data?.message,
              attachment: null,
              stamp_no: res?.data?.data?.stamp_no,
              to_info: toInfo,
            });
            dispatch(getDetailMessageSocketSuccess([res?.data?.data]));
            await callApiChatBotRequest(
              res?.data?.data?.message,
              res?.data?.data?.id,
            );
          } else {
            const joinUsers = listUserChat?.map(el => {
              return {userId: el.id, userName: el.last_name + el.first_name};
            });
            const toInfo = {
              type: MESSAGE_RANGE_TYPE.USER,
              ids: listUserChat?.map(el => el.id),
            };
            socket.emit('notification_ind2', {
              user_id: mes[0]?.user?._id,
              room_id: idRoomChat,
              room_name: dataDetail?.name,
              join_users: joinUsers,
              user_name: null,
              user_icon_url: null,
              client_name: listUserChat[0]?.client_name ?? null,
              message_text: null,
              attachment: null,
              stamp_no: null,
              to_info: toInfo,
            });
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            sendMessageError(error, mes[0]?.text);
          }
        }
      }
      // send files
      if (chosenFiles.length > 0) {
        await sendFile(mes[0]?.text === '');
      }
      // Khi call api gửi tin nhắn xong sẽ auto scroll xuống tin nhắn cuối cùng
      giftedChatRef.current?.scrollToBottom({
        animated: true,
        index: 0,
      });

      setIds([]);
      // prevent from becoming blue character after sending mention message.
      const formattedText1: (string | JSX.Element)[] = [];
      formattedText1.push(' ');
      setFormattedText(formattedText1);
      formattedText1.shift();
      setFormattedText(formattedText1);
      // メッセージが送信完了の後、メッセージ入力のstateがemptyになる。
      setInputText('');
      setListUserSelect([]);
      setIsSendingMessage(false);
    },
    [
      messageReply,
      messageEdit,
      ids,
      messageQuote,
      idRoomChat,
      chosenFiles,
      callApiChatBotRequest,
      dispatch,
      makeTemporallyDataMessage,
      sendFile,
      socket,
      userId,
      listUserChat,
      dataDetail,
      isSendingMessage,
    ],
  );

  const onDecoSelected = (tagName: string) => {
    let newText = '';
    let tag = '[' + tagName + ']';
    if (tagName === 'hr') {
      newText =
        inputText.substring(0, textSelection.end) +
        tag +
        inputText.substring(textSelection.end);
    } else {
      // insert closing tags
      let closingTag = '[/' + tagName + ']';
      newText =
        inputText.substring(0, textSelection.end) +
        closingTag +
        inputText.substring(textSelection.end);
      // insert opening tags
      let openingTag = '[' + tagName + ']';
      newText =
        newText.substring(0, textSelection.start) +
        openingTag +
        newText.substring(textSelection.start);
    }

    setInputText(newText);
    setFormattedText([newText]);
  };

  const changePartCopy = useCallback((data: any) => {
    setTimeout(() => setPartCopy(data), 200);
  }, []);

  const deleteFile = useCallback(
    async sourceURL => {
      const chosenFilesDeleted = chosenFiles.filter(item => {
        if (
          item.sourceURL &&
          item.sourceURL !== sourceURL &&
          item.uri !== sourceURL &&
          item.path !== sourceURL &&
          typeof item !== 'undefined'
        ) {
          return item;
        }
      });
      setChosenFiles(chosenFilesDeleted);
    },
    [chosenFiles],
  );

  const customBack = useCallback(() => {
    navigation.navigate(ROUTE_NAME.TAB_SCREEN, {
      idRoomChat,
    });
  }, [navigation, idRoomChat]);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }
    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!pageLoading || !me) {
      return;
    }
    if (!idMessageSearch) {
      // 通常画面遷移/onLoadMore/onLoadMoreDown
      if (!paging?.current_page || page !== paging?.current_page) {
        getListChat(page);
        getDetail();
        if (listUserChat?.length === 0) {
          getUserListChat();
        }
      }
      setPageLoading(false);
      if (!messId && !idMessageSearchListChat) {
        GlobalService.hideLoading();
      }
    } else if (idMessageSearch > 0) {
      // 未読ラインへ遷移しないようにする
      setAllowMoveToRedLine(false);
      const index = listChat.findIndex(
        (element: any) => element?.id === Number(idMessageSearch),
      );
      if (index >= 0) {
        try {
          giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex({
            animated: true,
            index: Math.max(index - 1, 0),
          });
          dispatch(saveIdMessageSearch(0));
          setPageLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        } finally {
          GlobalService.hideLoading();
        }
      } else {
        setBottomPage(null);
        // メッセージが存在するページをloadしていない場合、fetch
        fetchMessageSearch(idMessageSearch);
      }
    }
  }, [
    page,
    pageLoading,
    dispatch,
    fetchMessageSearch,
    getDetail,
    getListChat,
    idMessageSearch,
    listChat,
    paging?.current_page,
    listUserChat,
    getUserListChat,
    me,
    messId,
    idMessageSearchListChat,
  ]);

  // route?.paramsが変わったら実行
  // FirebaseMessage.tsxのhandleUserInteractionNotificationの中からこちらが実行される
  // push通知をタップした時に、route?.params.idRoomChatが変更になりこちらが実行される
  useEffect(() => {
    if (!me) {
      return;
    }
    if (pageLoading) {
      setIdRoom(idRoomChat);
    } else if (!pageLoading && idRoom !== idRoomChat) {
      // page関連初期化
      (async () => {
        setPage(1);
        setTopPage(1);
        setBottomPage(1);
        await dispatch(saveListUserChat([]));
        await dispatch(resetDataChat());
        await dispatch(saveIdRoomChat(idRoomChat));
        getListChat(1);
        getDetail();
        setIdRoom(idRoomChat);
      })();
    }
  }, [idRoomChat, pageLoading, getDetail, getListChat, idRoom, dispatch, me]);

  // 他画面からの遷移、メッセージへスクロール
  useEffect(() => {
    if (idMessageSearchListChat > 0) {
      GlobalService.showLoading();
      setTimeout(() => {
        dispatch(saveIdMessageSearch(idMessageSearchListChat));
        setPageLoading(true);
      }, 200);
    }
  }, [idMessageSearchListChat, dispatch]);

  // deeplink対応、メッセージへスクロール
  useEffect(() => {
    if (messId > 0 && me) {
      GlobalService.showLoading();
      setTimeout(() => {
        dispatch(saveIdMessageSearch(messId));
        setPageLoading(true);
      }, 200);
    }
  }, [messId, dispatch, me]);

  /**
   * 未読ラインが存在するページへの遷移処理.
   * 遷移直後のページ（1ページ目）に未読が存在する場合は未読ラインへの移動用変数を更新する.
   * 遷移直後のページに未読が存在しない場合は未読メッセージの存在するページに遷移する.
   */
  useEffect(() => {
    // 未読ラインへの遷移が許可されてない場合は移動しない
    if (!allowMoveToRedLine) {
      return;
    }

    if (redLineId) {
      setIdRedLine(redLineId);
    } else {
      return;
    }

    if (idRedLine) {
      const targetIndex = listChat.findIndex(
        (element: any) => element?.id === idRedLine,
      );

      if (targetIndex >= 0) {
        // 初期表示のページ（1ページ目）に未読ラインが存在する場合
        setIndexRedLine(targetIndex);
      } else {
        // 初期表示のページ以外（1ページ目以外）に未読ラインが存在する場合

        // 最新ページ読み込みができるように初期化
        setBottomPage(null);

        // 未読ラインの存在するページを取得
        fetchMessageSearch(idRedLine);
      }
    }
  }, [
    redLineId,
    idRedLine,
    listChat,
    fetchMessageSearch,
    idMessageSearch,
    allowMoveToRedLine,
  ]);

  /**
   * 未読ラインへのスクロール処理.
   * チャット詳細への遷移後、未読ラインが存在する場合はそこに移動する.
   */
  useEffect(() => {

    // 未読ラインが存在しない場合は移動しない
    if (!indexRedLine) {
      return;
    }

    // 未読ラインにスクロール
    console.log('unread message line index', indexRedLine);
    giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex({
      index: Math.max(indexRedLine, 0),
      animating: false,
    });

    // 未読ラインへの移動はチャット詳細画面では一度しか実施しない
    setAllowMoveToRedLine(false);
    GlobalService.hideLoading();
  }, [indexRedLine]);

  // WebSocket
  useEffect(() => {
    if (isGetInfoRoom) {
      getDetail();
    }
  }, [isGetInfoRoom, getDetail]);

  useEffect(() => {
    if (messageEdit || messageReply || messageQuote) {
      setShowModalStamp(false);
    }
  }, [messageEdit, messageReply, messageQuote]);

  useEffect(() => {
    if (!messageEdit) {
      setText('');
    }
  }, [messageEdit]);

  useEffect(() => {
    if (messageEdit) {
      dispatch(saveMessageReply(null));
      dispatch(saveMessageQuote(null));
    } else if (messageReply) {
      dispatch(saveMessageEdit(null));
      dispatch(saveMessageQuote(null));
    } else if (messageQuote) {
      dispatch(saveMessageEdit(null));
      dispatch(saveMessageReply(null));
    }
  }, [messageEdit, messageReply, messageQuote, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (formattedText[0]?.props?.children === '') {
        formattedText.shift();
        setFormattedText([...formattedText]);
      }
    }, 10);
  }, [formattedText]);

  return {
    chatUser,
    idRoomChat,
    visible,
    onShowMenu,
    listChat,
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
    removeReplyMessage,
    editMessage,
    removeEditMessage,
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
    setShowModalStamp,
    giftedChatRef,
    text,
    showModalTagName,
    setShowTag,
    isShowTagModal,
    listUserChat,
    setText,
    bookmarkMessage,
    setIds,
    ids,
    newIndexArray,
    setIndex,
    quoteMessage,
    messageQuote,
    listUserSelect,
    setListUserSelect,
    formattedText,
    setFormattedText,
    mentionedUsers,
    setMentionedUsers,
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
    setTextSelection,
    onDecoSelected,
    keyboardHeight,
    customBack,
    chosenFiles,
    deleteFile,
    setInputIndex,
    inputIndex,
    isSendingMessage,
    setPageLoading,
    isShowDecoButtons,
    setIsShowDecoButtons,
    accessoryHeight,
    setAccessoryHeight,
    toggleDecoButtons,
  };
};
