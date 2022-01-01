import {
  CLEAR_PARTNER_DATA,
  CLEAR_TIMER,
  DIALOG_ERROR,
  DIALOG_PENDING,
  DIALOG_SUCCESS,
  DISABLE_SUB_MENU,
  ENABLE_SUB_MENU,
  HIDE_SUB_MENU,
  SET_ALL_DIALOGS,
  SET_CURRENT_DIALOG_ID,
  SET_CURRENT_PARTNER,
  SET_PARTNER_ONLINE,
  SET_PARTNER_TYPING,
  SET_TIMER,
  SHOW_SUB_MENU,
} from '../constants/types';

const initialState = {
  allDialogs: [],
  isLoading: false,
  currentDialog: null,
  currentPartner: null,
  currentPartnerOnline: false,
  currentPartnerTyping: false,
  menu: false,
  submenu: true,
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
    case SHOW_SUB_MENU:
      return {
        ...state,
        menu: true,
      };
    case HIDE_SUB_MENU:
      return {
        ...state,
        menu: false,
      };
    case DISABLE_SUB_MENU:
      return {
        ...state,
        submenu: false,
      };
    case ENABLE_SUB_MENU:
      return {
        ...state,
        submenu: true,
      };
    default:
      return state;
  }
};
