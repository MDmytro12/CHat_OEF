import {
  DIALOG_ERROR,
  DIALOG_PENDING,
  DIALOG_SUCCESS,
  SET_ALL_DIALOGS,
  SET_CURRENT_DIALOG_ID,
  SET_CURRENT_PARTNER,
} from '../constants/types';

const initialState = {
  allDialogs: [],
  isLoading: false,
  currentDialog: null,
  currentPartner: null,
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
    default:
      return state;
  }
};
