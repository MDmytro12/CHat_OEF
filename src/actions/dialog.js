import {
  CREATE_DIALOG,
  DIALOG_ERROR,
  DIALOG_PENDING,
  DIALOG_SUCCESS,
  SET_ALL_DIALOGS,
} from '../constants/types';

export const createDialog = (navigation, partnerId, token, userId) => ({
  type: CREATE_DIALOG,
  payload: {partnerId, userId, token, navigation},
});

export const setAllDialogs = allDialogs => ({
  type: SET_ALL_DIALOGS,
  payload: dialogs,
});

export const dialogError = () => ({type: DIALOG_ERROR});

export const dialogSuccess = () => ({type: DIALOG_SUCCESS});

export const dialogPending = () => ({type: DIALOG_PENDING});
