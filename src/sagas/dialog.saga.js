import axios from 'axios';
import {takeEvery, put, call} from 'redux-saga/effects';
import {dialogError, dialogPending, dialogSuccess} from '../actions/dialog';
import {searchError} from '../actions/search';
import {
  ERROR_DIALOG_ALREADY_EXISTS,
  ERROR_INTERNET_CONNECTION,
} from '../constants/error';
import {LINK_CREATE_DIALOG} from '../constants/links';
import {CREATE_DIALOG} from '../constants/types';

// createDialog

const fetchCreateDialog = ({token, userId, partnerId}) =>
  axios.post(
    LINK_CREATE_DIALOG,
    {partnerId, userId},
    {headers: {Authorization: token}},
  );

function* createDialogWatcher() {
  yield takeEvery(CREATE_DIALOG, createDialogWorker);
}

function* createDialogWorker({payload}) {
  try {
    yield put(dialogPending());
    yield call(() => fetchCreateDialog(payload));

    yield put(dialogSuccess());

    payload.navigation.navigate('DialogItem', {
      prevScreen: 'DialogItem',
      text: 'Діалог створено ',
    });
  } catch (err) {
    yield put(searchError());
    yield put(dialogError());
    if (err?.response && err.response.status === 405) {
      alert(ERROR_DIALOG_ALREADY_EXISTS);
      return;
    }
    console.log('ERROR : ', err.message);
    alert(ERROR_INTERNET_CONNECTION);
  }
}

export {createDialogWatcher};
