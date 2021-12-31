import {
  CLEAR_PARTNER_DATA,
  CLEAR_TIMER,
  CREATE_DIALOG,
  DIALOG_DELETE_BY_ID,
  DIALOG_ERROR,
  DIALOG_PENDING,
  DIALOG_SUCCESS,
  GET_ALL_DIALOGS,
  SET_ALL_DIALOGS,
  SET_CURRENT_DIALOG_ID,
  SET_CURRENT_PARTNER,
  SET_PARTNER_ONLINE,
  SET_PARTNER_TYPING,
  SET_TIMER,
} from '../constants/types';

export const createDialog = (navigation, partnerId, token, userId) => ({
  type: CREATE_DIALOG,
  payload: {partnerId, userId, token, navigation},
});

export const getAllDialog = (token, userId) => ({
  type: GET_ALL_DIALOGS,
  payload: {token, userId},
});

export const setAllDialogs = allDialogs => ({
  type: SET_ALL_DIALOGS,
  payload: {allDialogs},
});

export const dialogError = () => ({type: DIALOG_ERROR});

export const dialogSuccess = () => ({type: DIALOG_SUCCESS});

export const dialogPending = () => ({type: DIALOG_PENDING});

export const deleteDialogById = (dialogId, token) => {
  return {
    type: DIALOG_DELETE_BY_ID,
    payload: {dialogId, token},
  };
};

export const setCurrentDialog = dialogId => ({
  type: SET_CURRENT_DIALOG_ID,
  payload: {
    dialogId,
  },
});

export const setCurrentPartnerId = currentPartnerId => ({
  type: SET_CURRENT_PARTNER,
  payload: {
    currentPartnerId,
  },
});

export const setPartnerOnline = online => ({
  type: SET_PARTNER_ONLINE,
  payload: {
    online,
  },
});

export const setPartnerTyping = isTyping => ({
  type: SET_PARTNER_TYPING,
  payload: {isTyping},
});

export const clearPartnerData = () => ({type: CLEAR_PARTNER_DATA});
