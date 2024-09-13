export type ChatState = {
  roomList: any;
  pagingListRoom: any;
  detailChat: any[];
  pagingDetail: any;
  idCompany: any;
  message_pinned: any;
  id_roomChat: any;
  messageReply: any;
  messageEdit: any;
  id_messageSearch: number | null;
  isGetInfoRoom: boolean;
  messageQuote: any;
  redLineId: any;
  modalFilterChat: boolean;
  type_Filter: any;
  categoryID_Filter: any;
  status_Filter: any;
  unReadMessageCount: any;
  listUserChat: Array<any>;
};

export const INITIAL_STATE_CHAT: ChatState = {
  roomList: null,
  detailChat: null,
  idCompany: null,
  pagingDetail: null,
  message_pinned: null,
  id_roomChat: null,
  messageReply: null,
  messageEdit: null,
  pagingListRoom: null,
  id_messageSearch: null,
  isGetInfoRoom: false,
  messageQuote: null,
  redLineId: null,
  modalFilterChat: false,
  type_Filter: null,
  categoryID_Filter: null,
  status_Filter: 'すべてのチャット',
  unReadMessageCount: null,
  listUserChat: [],
};
