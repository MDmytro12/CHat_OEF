import {
  CLEAR_PARTNER_DATA,
  CLEAR_TIMER,
  DIALOG_ERROR,
  DIALOG_PENDING,
  DIALOG_SUCCESS,
  SET_ALL_DIALOGS,
  SET_CURRENT_DIALOG_ID,
  SET_CURRENT_PARTNER,
  SET_PARTNER_ONLINE,
  SET_PARTNER_TYPING,
  SET_TIMER,
} from '../constants/types';

const initialState = {
  allDialogs: [],
  isLoading: false,
  currentDialog: null,
  currentPartner: null,
  currentPartnerOnline: false,
  currentPartnerTyping: false,
  timer: null,
};

export const dialogReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case DIALOG_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case DIALOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DIALOG_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ALL_DIALOGS: {
      return {
        ...state,
        allDialogs: payload.allDialogs,
      };
    }
    case SET_CURRENT_DIALOG_ID:
      return {
        ...state,
        currentDialog: payload.dialogId,
      };
    case SET_CURRENT_PARTNER:
      return {
        ...state,
        currentPartner: payload.currentPartnerId,
      };
    case SET_PARTNER_ONLINE:
      return {
        ...state,
        currentPartnerOnline: payload.online,
      };
    case SET_PARTNER_TYPING:
      return {
        ...state,
        currentPartnerTyping: payload.isTyping,
      };
    case CLEAR_PARTNER_DATA:
      return {
        ...state,
        currentDialog: null,
        currentPartner: null,
        currentPartnerOnline: false,
        currentPartnerTyping: false,
      };
    case SET_TIMER:
      return {
        ...state,
        timer: payload,
      };
    case CLEAR_TIMER:
      return {
        ...state,
        timer: null,
      };
    default:
      return state;
  }
};
